import React, { useState } from 'react'
import { Timeline } from '../../Components/Timeline'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { getMeasurement, iMeasurement, createMeasurementCategory, getCategories } from "../../Utils/dbMock";
import { CreateCategory } from "../../Components/CreateCategory";
import { EditMeasurement } from "../../Components/EditMeasurement";
import { Button, Grid } from "@material-ui/core";
import './style.scss';

export const Dashboard: React.FC = (props) => {
  const [timelineData, setTimelineData] = useState<iMeasurement[]>([]);
  const [catCreateOpen, setCatCreateOpen] = useState(false);
  // const [measurementOpen, setMeasurementOpen] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<null | number>(null);
  const [selectedMetric, setSelectedMetric] = useState('weight');

  React.useEffect(() => {
    fetchTimelineData(selectedMetric);
  },[selectedMetric])

  const categories = getCategories();

  function fetchTimelineData(dataName: string) {
    let measurement = getMeasurement(dataName)
    if (measurement?.data) setTimelineData(measurement.data);
  }

  function doCreateCategory(name: string) {
    setCatCreateOpen(false);
    createMeasurementCategory(name);
  }

  function doSaveMeasurement(){
    
  }

  return <>
    <Grid container direction="column">
      <Grid item>
        <Grid container alignItems="center" justify="space-between">
          <Dropdown options={categories} value={selectedMetric} onChange={val => setSelectedMetric(val.value)} />
          <Button variant="outlined">Add measurement</Button>
          <Button variant="outlined" onClick={() => setCatCreateOpen(true)}>Create category</Button>
        </Grid>
      </Grid>
      <Grid item>
        <Timeline data={timelineData} onClick={setSelectedMeasurement} />
      </Grid>
    </Grid>
    <CreateCategory open={catCreateOpen} onClose={() => setCatCreateOpen(false)} createCategory={doCreateCategory} />
    <EditMeasurement open={selectedMeasurement != null} onClose={() => setSelectedMeasurement(null)} saveChanges={() => {doSaveMeasurement()}} />
  </>
}