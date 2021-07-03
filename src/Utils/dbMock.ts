const storageName = "Measurements";

export function populateStorage() {
  let existing = localStorage.getItem(storageName);
  let data: iMeasurementArr[] = require("./db.json");
  if (!existing) localStorage.setItem(storageName, JSON.stringify(data));
}

function getAllMeasurements() {
  let dataString = localStorage.getItem(storageName);
  if (!dataString) return [];
  let data: iMeasurementArr[] = JSON.parse(dataString);
  return data;
}

export function getMeasurement(measurementName: string) {
  let data = getAllMeasurements();
  console.log(`data`, data)
  let measurements = data.find(x => x.name === measurementName);
  console.log(`measurement`, measurements)
  return measurements;
}

export function saveMeasurement(measurementName: string, measurement: number, date: string) {
  let measurements = getAllMeasurements();

  let i = measurements.findIndex(x => x.name === measurementName);

  if (!measurements[i]?.data) measurements[i].data = [];
  measurements[i].data.push({ date, measurement })
  localStorage.setItem(storageName, JSON.stringify(measurements));
}

export function createMeasurementCategory(measurementName: string) {
  let measurements = getAllMeasurements();
  measurements.push({ name: measurementName, data: [] });
  localStorage.setItem(storageName, JSON.stringify(measurements));
}
export function getCategories(){
  let data = getAllMeasurements();
  return data.map(x => x.name);
}


export interface iMeasurementArr {
  name: string;
  data: iMeasurement[];
}

export interface iMeasurement {
  measurement: number;
  date: string
}
