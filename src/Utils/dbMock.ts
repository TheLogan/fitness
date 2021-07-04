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

  for (const metric of data) {
    metric.data = metric.data.map(x => {
      return {
        id: x.id,
        date: new Date(x.date),
        measurement: x.measurement
      }
    })
  }
  return data;
}

export function getMeasurement(measurementName: string) {
  let data = getAllMeasurements();
  let measurements = data.find(x => x.name === measurementName);
  return measurements;
}

export function saveMeasurement(measurementName: string, measurement: number, date: Date) {
  let measurements = getAllMeasurements();
  let i = measurements.findIndex(x => x.name === measurementName);

  if (!measurements[i]?.data) measurements[i].data = [];
  let id = measurements[i].data.length ? Math.max(...measurements[i].data.map(x => x.id)) + 1 : 0;
  measurements[i].data.push({id, date, measurement })
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
  id: number;
  measurement: number;
  date: Date
}
