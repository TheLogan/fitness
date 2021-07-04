import React, { useEffect, useState } from 'react'
import { Modal, Grid, Paper, TextField, Button } from '@material-ui/core';
import "./style.scss"
import { iEditMeasurement } from './props';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export const EditMeasurement: React.FC<iEditMeasurement> = (props) => {
  const [measurement, setMeasurement] = useState('0');
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(new Date());

  useEffect(() => {
    setMeasurement(props.selectedMeasurement?.measurement.toString() || '0');
    setSelectedDate(props.selectedMeasurement?.date || new Date());
  }, [props.selectedMeasurement])

  function callSaveChanges() {
    if (!measurement) {
      setErrorMsg("Measurement can't be empty");
      return
    }
    if(!props.selectedMeasurement || !selectedDate) return;

    props.saveChanges({date: new Date(selectedDate.toISOString()), id: props.selectedMeasurement.id, measurement: Number(measurement)});
  }

  function changeMeasurement(value: string) {
    let onlyNumbers = value.replace(/[^0-9]/g, '');
    if (onlyNumbers.length < value.length) setErrorMsg("Only accepts numbers");
    else setErrorMsg("");
    setMeasurement(onlyNumbers)
  }

  let title = "";
  if(props.selectedMeasurement)
    title = props.selectedMeasurement.id < 0 ? 'Add measurement' : 'Edit measurement';

  return <>
    <Modal open={props.selectedMeasurement !== undefined} id="createCategoryModal" >
      <Grid container>
        <Grid item>
          <Paper id="createCategoryModal">
            <Grid container direction="column" justify="space-evenly" alignContent="center" style={{ height: "100%" }}>
              <h1 style={{ textAlign: "center" }}>{title}</h1>
              <TextField
                placeholder="Measurement"
                helperText={errorMsg}
                value={measurement}
                onChange={e => changeMeasurement(e.target.value)}
                onFocus={() => setErrorMsg("")}
                onBlur={() => setErrorMsg("")}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  onChange={val => setSelectedDate(val)}
                  maxDate={new Date()}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <Grid container alignContent="center" justify="space-evenly" style={{ marginTop: 'auto', marginBottom: '10px' }}>
                <Button variant="contained" onClick={props.onClose}>Back</Button>
                <Button variant="contained" onClick={props.deleteData}>Delete</Button>
                <Button variant="contained" onClick={callSaveChanges} >Save</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  </>
}