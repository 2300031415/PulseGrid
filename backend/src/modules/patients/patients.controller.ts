import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';
import { FallbackDbService } from '../../config/fallback-db.service';
import { alerts as fallbackAlerts } from '../../common/mock-data';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fallbackDbService: FallbackDbService,
  ) {}

  private mapPatient(row: any) {
    let labTests = [];
    try {
      if (row.lab_tests) {
        labTests = typeof row.lab_tests === 'string' ? JSON.parse(row.lab_tests) : row.lab_tests;
      } else if (row.labTests) {
        labTests = typeof row.labTests === 'string' ? JSON.parse(row.labTests) : row.labTests;
      }
    } catch {}

    // Fallback if empty but has old lab_test
    if ((!labTests || labTests.length === 0) && row.lab_test && row.lab_test !== 'None') {
      labTests = [{
        id: `LT-${row.id}-1`,
        name: row.lab_test,
        status: row.lab_report_pdf ? 'Uploaded' : 'Pending',
        pdfFilename: row.lab_report_pdf || null,
        pdfData: null,
      }];
    }

    let parsedMedications = null;
    try {
      if (row.medications) {
        parsedMedications = typeof row.medications === 'string' ? JSON.parse(row.medications) : row.medications;
      }
    } catch {}

    return {
      id: row.id,
      name: row.name,
      ward: row.ward || 'General',
      age: row.age ?? 58,
      hr: row.hr !== null && row.hr !== undefined ? Number(row.hr) : null,
      spo2: row.spo2 !== null && row.spo2 !== undefined ? Number(row.spo2) : null,
      status: row.status === 'ACTIVE' ? 'Stable' : (row.status || 'Stable'),
      recovery: row.recovery ?? 78,
      condition: row.diagnosis || row.condition || 'Monitoring in progress',
      doctor: row.doctor || 'On-call physician',
      room: row.room || 'TBD',
      risk: row.risk || 'Medium',
      labTest: row.lab_test || row.labTest || 'None',
      labTests,
      hospitalCode: row.hospital_code || row.hospitalCode || 'CITYHOSP01',
      labReportPdf: row.lab_report_pdf || row.labReportPdf || null,
      
      // Clinical fields
      diagnosisDetails: row.diagnosisDetails || row.diagnosis_details || null,
      admissionReason: row.admissionReason || row.admission_reason || null,
      admissionReasonDetails: row.admissionReasonDetails || row.admission_reason_details || null,
      currentTreatment: row.currentTreatment || row.current_treatment || null,
      currentTreatmentDetails: row.currentTreatmentDetails || row.current_treatment_details || null,
      riskDetails: row.riskDetails || row.risk_details || null,
      medications: parsedMedications,
    };
  }

  private mapAlert(row: any) {
    return {
      id: row.id,
      title: row.type || 'Alert',
      patient: row.patient || 'Unassigned',
      severity: row.severity || 'Info',
      time: row.created_at ? new Date(row.created_at).toLocaleTimeString() : 'Now',
    };
  }

  @Get()
  async findAll(@Query('hospitalCode') hospitalCode?: string) {
    try {
      let query = 'SELECT * FROM patients';
      const params = [];
      if (hospitalCode) {
        query += ' WHERE UPPER(hospital_code) = $1';
        params.push(hospitalCode.toUpperCase());
      }
      query += ' ORDER BY created_at DESC LIMIT 100';
      const rows = await this.databaseService.query(query, params);
      return rows.map((row) => this.mapPatient(row));
    } catch {
      const allPatients = this.fallbackDbService.getPatients();
      if (hospitalCode) {
        return allPatients.filter(
          (p) => !p.hospitalCode || p.hospitalCode.toUpperCase() === hospitalCode.toUpperCase()
        );
      }
      return allPatients;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const rows = await this.databaseService.query('SELECT * FROM patients WHERE id = $1', [id]);
      return rows[0]
        ? this.mapPatient(rows[0])
        : this.fallbackDbService.getPatientById(id) || this.fallbackDbService.getPatients()[0];
    } catch {
      return this.fallbackDbService.getPatientById(id) || this.fallbackDbService.getPatients()[0];
    }
  }

  @Get(':id/overview')
  async getOverview(@Param('id') id: string) {
    try {
      const patientRows = await this.databaseService.query('SELECT * FROM patients WHERE id = $1', [id]);
      const alertRows = await this.databaseService.query(
        'SELECT a.*, p.name AS patient FROM alerts a LEFT JOIN patients p ON p.id = a.patient_id WHERE a.patient_id = $1 ORDER BY a.created_at DESC',
        [id]
      );

      const patient = patientRows[0]
        ? this.mapPatient(patientRows[0])
        : this.fallbackDbService.getPatientById(id) || this.fallbackDbService.getPatients()[0];

      return {
        patient,
        vitals: {
          heartRate: patient.hr,
          oxygenLevel: patient.spo2,
          temperature: 36.8,
        },
        ecg: {
          rhythm: patient.status === 'Critical' ? 'Irregular' : 'Normal',
          summary: 'ECG stream active',
        },
        medications: ['Aspirin', 'Beta-blocker'],
        reports: ['Discharge summary', 'Lab panel'],
        alerts: alertRows.length
          ? alertRows.map((row) => this.mapAlert(row))
          : fallbackAlerts.filter((item) => item.patient === patient.name),
        aiInsights: {
          riskScore: patient.risk,
          recoveryTrend: `${patient.recovery}%`,
        },
      };
    } catch {
      const patient = this.fallbackDbService.getPatientById(id) || this.fallbackDbService.getPatients()[0];
      return {
        patient,
        vitals: {
          heartRate: patient.hr,
          oxygenLevel: patient.spo2,
          temperature: 36.8,
        },
        ecg: {
          rhythm: patient.status === 'Critical' ? 'Irregular' : 'Normal',
          summary: 'ECG stream active',
        },
        medications: ['Aspirin', 'Beta-blocker'],
        reports: ['Discharge summary', 'Lab panel'],
        alerts: fallbackAlerts.filter((item) => item.patient === patient.name),
        aiInsights: {
          riskScore: patient.risk,
          recoveryTrend: `${patient.recovery}%`,
        },
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    try {
      // If we are updating labTests array, serialize it to JSON string
      let labTestsVal = body.labTests;
      if (labTestsVal !== undefined) {
        if (typeof labTestsVal !== 'string') {
          labTestsVal = JSON.stringify(labTestsVal);
        }
        await this.databaseService.query(
          'UPDATE patients SET lab_tests = $1 WHERE id = $2',
          [labTestsVal, id]
        );
      }
      if (body.labTest !== undefined) {
        await this.databaseService.query(
          'UPDATE patients SET lab_test = $1 WHERE id = $2',
          [body.labTest, id]
        );
      }
      if (body.hr !== undefined) {
        const hrVal = body.hr === null ? null : Number(body.hr);
        await this.databaseService.query('UPDATE patients SET hr = $1 WHERE id = $2', [hrVal, id]);
      }
      if (body.spo2 !== undefined) {
        const spo2Val = body.spo2 === null ? null : Number(body.spo2);
        await this.databaseService.query('UPDATE patients SET spo2 = $1 WHERE id = $2', [spo2Val, id]);
      }
      if (body.status !== undefined) {
        await this.databaseService.query('UPDATE patients SET status = $1 WHERE id = $2', [body.status, id]);
      }
      if (body.recovery !== undefined) {
        await this.databaseService.query('UPDATE patients SET recovery = $1 WHERE id = $2', [Number(body.recovery), id]);
      }

      // Clinical fields SQL updates
      if (body.condition !== undefined) {
        await this.databaseService.query('UPDATE patients SET condition = $1 WHERE id = $2', [body.condition, id]);
      }
      if (body.diagnosisDetails !== undefined) {
        await this.databaseService.query('UPDATE patients SET diagnosis_details = $1 WHERE id = $2', [body.diagnosisDetails, id]);
      }
      if (body.admissionReason !== undefined) {
        await this.databaseService.query('UPDATE patients SET admission_reason = $1 WHERE id = $2', [body.admissionReason, id]);
      }
      if (body.admissionReasonDetails !== undefined) {
        await this.databaseService.query('UPDATE patients SET admission_reason_details = $1 WHERE id = $2', [body.admissionReasonDetails, id]);
      }
      if (body.currentTreatment !== undefined) {
        await this.databaseService.query('UPDATE patients SET current_treatment = $1 WHERE id = $2', [body.currentTreatment, id]);
      }
      if (body.currentTreatmentDetails !== undefined) {
        await this.databaseService.query('UPDATE patients SET current_treatment_details = $1 WHERE id = $2', [body.currentTreatmentDetails, id]);
      }
      if (body.risk !== undefined) {
        await this.databaseService.query('UPDATE patients SET risk = $1 WHERE id = $2', [body.risk, id]);
      }
      if (body.riskDetails !== undefined) {
        await this.databaseService.query('UPDATE patients SET risk_details = $1 WHERE id = $2', [body.riskDetails, id]);
      }
      if (body.medications !== undefined) {
        await this.databaseService.query('UPDATE patients SET medications = $1 WHERE id = $2', [JSON.stringify(body.medications), id]);
      }

      this.fallbackDbService.updatePatientVitals(id, body);
      if (body.labTests !== undefined) {
        this.fallbackDbService.updatePatientLabTests(id, body.labTests || []);
      }
      return { id, ...body };
    } catch {
      if (body.labTests !== undefined) {
        this.fallbackDbService.updatePatientLabTests(id, body.labTests);
      }
      if (body.labTest !== undefined) {
        this.fallbackDbService.updatePatientLabTest(id, body.labTest);
      }
      if (
        body.hr !== undefined || 
        body.spo2 !== undefined || 
        body.status !== undefined || 
        body.recovery !== undefined ||
        body.condition !== undefined ||
        body.diagnosisDetails !== undefined ||
        body.admissionReason !== undefined ||
        body.admissionReasonDetails !== undefined ||
        body.currentTreatment !== undefined ||
        body.currentTreatmentDetails !== undefined ||
        body.risk !== undefined ||
        body.riskDetails !== undefined ||
        body.medications !== undefined
      ) {
        this.fallbackDbService.updatePatientVitals(id, body);
      }
      return { id, ...body };
    }
  }

  @Patch(':id/lab-tests')
  async updateLabTests(@Param('id') id: string, @Body() body: { labTests: any[] }) {
    return this.update(id, body);
  }
}
