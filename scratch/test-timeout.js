const http = require('http');

http.get('http://localhost:4000/patients/P-1043', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const patient = JSON.parse(data);
    console.log("==========================================");
    console.log("NESTJS DIRECT BACKEND DATA FOR P-1043:");
    console.log("==========================================");
    console.log("Name:", patient.name);
    console.log("HR:", patient.hr);
    console.log("SpO2:", patient.spo2);
    console.log("lastTelemetry:", patient.lastTelemetry);
    console.log("Current Time (Date.now()):", Date.now());
    console.log("Time Difference (seconds):", (Date.now() - (patient.lastTelemetry || 0)) / 1000);
  });
}).on('error', (err) => {
  console.error("Error fetching from NestJS:", err.message);
});
