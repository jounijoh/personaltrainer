import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import EditCustomer from "./EditCustomer";
import Button from "@mui/material/Button";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-material.css";
import { CUSTOMER_API_URL, TRAINING_API_URL } from "../constants";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch(CUSTOMER_API_URL)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("something went wrong while fetching data");
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const [columnDefs] = useState([
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },

    {
      field: "Edit", width: 100,
      cellRenderer: (params) => (
        <EditCustomer data={params.data} updateCustomer={updateCustomer} />
      ),
    },
    {
      field: "Delete",
      width: 100,
      cellRenderer: (params) => (
        <Button>
          <ClearOutlinedIcon
            size="small"
            color="error"
            onClick={() => deleteCustomer(params.data)}
          >
            Delete
          </ClearOutlinedIcon>
        </Button>
      ),
    },
    {
      field: "Add Training",
      width: 120,
      cellRenderer: (params) => (
        <AddTraining data={params.data} addTraining={addTraining} />
      ),
    },
  ]);

  // DELETE CUSTOMER
  const deleteCustomer = (data) => {
    if (
      window.confirm(
        "Are you sure you want to delete customer: " +
          data.firstname +
          " " +
          data.lastname +
          "?"
      )
    ) {
      fetch(data.links[0].href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) fetchData();
          else alert("Something went wront in deletion");
        })
        .catch((err) => console.error(err));
    }
  };

  // ADD CUSTOMER
  const addCustomer = (customer) => {
    fetch(CUSTOMER_API_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) fetchData();
        else alert("Something went wrong in addition");
      })
      .catch((err) => console.log(err));
  };

  // UPDATE CUSTOMER
  const updateCustomer = (customer, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) fetchData();
        else alert("Something went wrong in addition");
      })
      .catch((err) => console.log(err));
  };

  // ADD TRAINING TO A CUSTOMER
  const addTraining = (training) => {
    fetch(TRAINING_API_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) fetchData();
        else alert("Something went wrong in addition");
      })
      .catch((err) => console.log(err));
  };

  // EXPORT TO CSV
  const gridRef = useRef();
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      resizable: true,
      flex: 1
      
    };
  }, []);

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const onBtnExport = useCallback(() => {
    const params = {
      columnKeys: [
        "firstname",
        "lastname",
        "streetaddress",
        "postcode",
        "city",
        "email",
        "phone",
      ],
    };
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  // Search functions
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <>
    <div>
      <div className="rowC">
        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          onInput={onFilterTextBoxChanged}
        />
        <AddCustomer addCustomer={addCustomer} />
      </div>
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={defaultColDef}
          suppressExcelExport={true}
          popupParent={popupParent}
          cacheQuickFilter={true}
        />
      </div>
      <button onClick={onBtnExport}>Export customer data</button>
      </div>
    </>
  );
}
