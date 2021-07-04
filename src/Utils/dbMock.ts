const storageName = "Measurements";

export function populateStorage(force: boolean = false) {
  let existing = localStorage.getItem(storageName);
  let data: iMeasurementArr[] = require("./db.json");
  if (!existing || force) localStorage.setItem(storageName, JSON.stringify(data));
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

export function saveMeasurement(measurementName: string, data: iMeasurement) {
  let measurements = getAllMeasurements();
  let metricIndex = measurements.findIndex(x => x.name === measurementName);

  if (!measurements[metricIndex]?.data) measurements[metricIndex].data = [];

  if (data.id === -1) {
    data.id = measurements[metricIndex].data.length ? Math.max(...measurements[metricIndex].data.map(x => x.id)) + 1 : 0;
    measurements[metricIndex].data.push(data);
  } else {
    let measurementIndex = measurements[metricIndex].data.findIndex(x => x.id === data.id);
    measurements[metricIndex].data[measurementIndex] = data;
  }

  localStorage.setItem(storageName, JSON.stringify(measurements));
}

export function createMeasurementCategory(measurementName: string) {
  let measurements = getAllMeasurements();
  measurements.push({ name: measurementName, data: [] });
  localStorage.setItem(storageName, JSON.stringify(measurements));
}
export function getCategories() {
  let data = getAllMeasurements();
  return data.map(x => x.name);
}

export function deleteMeasurement(category: string, id: number) {
  let all = getAllMeasurements();
  let categoryIndex = all.findIndex(x => x.name === category);
  let measurementIndex = all[categoryIndex].data.findIndex(x => x.id === id);
  all[categoryIndex].data.splice(measurementIndex, 1);
  localStorage.setItem(storageName, JSON.stringify(all));
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
