import { Controller, Get, Param } from '@nestjs/common';
import { patients } from '../../common/mock-data';

@Controller('monitoring')
export class MonitoringController {
  @Get('live')
  getLiveMonitoring() {
    return {
      patients,
      status: 'online',
      generatedAt: new Date().toISOString(),
    };
  }

  @Get('patient/:id')
  getPatientMonitoring(@Param('id') id: string) {
    const patient = patients.find((item) => item.id === id) || patients[0];
    return {
      patient,
      vitals: {
        heartRate: patient.hr,
        oxygenLevel: patient.spo2,
        temperature: 36.8,
        respiratoryRate: 18,
      },
    };
  }
}
