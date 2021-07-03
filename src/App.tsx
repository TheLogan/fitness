import { CssBaseline } from "@material-ui/core";
import React from "react";
import { Dashboard } from "./Pages/Dashboard";
import { Layout } from "./Pages/Layout";
import { populateStorage } from './Utils/dbMock'


function App() {
  React.useEffect(() => {
    populateStorage(); //Runs when the page is first loaded
  }, [])

  return (
    <Layout>
      <CssBaseline />
      <Dashboard />
    </Layout>
  );
}

export default App;
