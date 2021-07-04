import React from 'react'
import { Modal, Grid, Paper, TextField, Button } from '@material-ui/core';
import "./style.scss"
import { iEditMeasurement } from './props';

export const EditMeasurement: React.FC<iEditMeasurement> = (props) => {

  const [categoryName, setCategoryName] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("")

  function callCreateCat() {
    if (!categoryName) {
      setErrorMsg("Name can't be empty")
      return
    }
    // props.createCategory(categoryName)
  }

  return <>
    <Modal open={props.open} id="createCategoryModal" >
      <Grid container>
        <Grid item>
          <Paper id="createCategoryModal">
            <Grid container direction="column" justify="space-evenly" alignContent="center" style={{ height: "100%" }}>
              <h1 style={{ textAlign: "center" }}>Create new category</h1>
              <TextField
                placeholder="Category name"
                helperText={errorMsg}
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                onFocus={() => setErrorMsg("")}
              />
              <Grid container alignContent="center" justify="space-evenly" style={{ marginTop: 'auto', marginBottom: '10px' }}>
                <Button variant="contained" onClick={props.onClose}>Back</Button>
                <Button variant="contained" onClick={callCreateCat} >Create</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  </>
}