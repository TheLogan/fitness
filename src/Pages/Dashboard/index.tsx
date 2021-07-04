import React, { useState } from 'react'
import { Timeline } from '../../Components/Timeline'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { getMeasurement, iMeasurement, createMeasurementCategory, getCategories, saveMeasurement, populateStorage, deleteMeasurement } from "../../Utils/dbMock";
import { CreateCategory } from "../../Components/CreateCategory";
import { EditMeasurement } from "../../Components/EditMeasurement";
import { Button, Grid } from "@material-ui/core";
import './style.scss';

export const Dashboard: React.FC = (props) => {
  const [timelineData, setTimelineData] = useState<iMeasurement[]>([]);
  const [catCreateOpen, setCatCreateOpen] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<undefined | iMeasurement>(undefined);
  const [selectedMetric, setSelectedMetric] = useState('weight');



  React.useEffect(() => {
    fetchTimelineData(selectedMetric);
  }, [selectedMetric])

  const categories = getCategories();

  function fetchTimelineData(dataName: string) {
    let measurement = getMeasurement(dataName)
    if (measurement?.data) setTimelineData(measurement.data);
  }

  function doCreateCategory(name: string) {
    setCatCreateOpen(false);
    createMeasurementCategory(name);
  }

  function handleSelectMeasurement(id: number) {
    if (id === -1) {
      setSelectedMeasurement({ id: -1, date: new Date(), measurement: 0 });
    } else {
      setSelectedMeasurement(timelineData.find(x => x.id === id));
    }
  }

  function doSaveMeasurement(changedMeasurement: iMeasurement) {
    if (!selectedMeasurement) return;
    saveMeasurement(selectedMetric, changedMeasurement);
    setSelectedMeasurement(undefined);
    fetchTimelineData(selectedMetric);
  }

  function handleDeleteData(){
    if(!selectedMeasurement) return;
    deleteMeasurement(selectedMetric, selectedMeasurement.id);
    setSelectedMeasurement(undefined);
    fetchTimelineData(selectedMetric);
  }

  return <>
    <Grid container direction="column">
      <Grid item>
        <Grid container alignItems="center" justify="space-between">
          <Dropdown options={categories} value={selectedMetric} onChange={val => setSelectedMetric(val.value)} />
          <Button variant="outlined" onClick={() => handleSelectMeasurement(-1)}>Add measurement</Button>
          <Button variant="outlined" onClick={() => setCatCreateOpen(true)}>Create category</Button>
        </Grid>
      </Grid>
      <Grid item>
        <Timeline data={timelineData} onClick={handleSelectMeasurement} />
      </Grid>
      <Button onClick={() => { populateStorage(true); fetchTimelineData(selectedMetric); }}>Reset</Button>
    </Grid>
    <CreateCategory open={catCreateOpen} onClose={() => setCatCreateOpen(false)} createCategory={doCreateCategory} />
    <EditMeasurement
      selectedMeasurement={selectedMeasurement}
      onClose={() => setSelectedMeasurement(undefined)}
      saveChanges={(changedMeasurement) => { doSaveMeasurement(changedMeasurement) }}
      deleteData={handleDeleteData}
    />
  </>
}