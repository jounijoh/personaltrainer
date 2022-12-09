import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import dateFormatter from "./DateFormatter";




export default function GetTrainingsList() {
  const [trainings, setTrainings] = useState([]);


  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => {
        if (response.ok) return response.json();
        else alert("something went wrong while fetching data");
      })
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };
 

  const [columnDefs] = useState([
    { field: "date", sortable: true, filter: true,
      valueFormatter: params =>  dateFormatter(params.data.date)
    },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    { field: "customer.firstname", sortable: true, filter: true,},
    { field: "customer.lastname", sortable: true, filter: true,
      },
      {
        cellRenderer: (params) => (
          <Button
            size="small"
            color="error"
            onClick={() => deleteTraining(params.data)}
          >
            Delete
          </Button>
        ),
      },
  ]);

  // DELETE TRAINING
  const deleteTraining = (data) => {
    
    if (
      window.confirm(
        "Are you sure you want to delete " + data.activity + " training on " +
        dateFormatter(data.date))
    ) {
      fetch(data.links[0].href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) fetchData();
          else alert("Something went wront in deletion");
        })
        .catch((err) => console.error(err));
    } 
  };

  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "90%", margin: "auto" }}
    >
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}