import "./App.css";
import * as React from "react";
import CustomerList from "./components/CustomerList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import GetTrainingsList from "./components/GetTrainingsList";
import TrainingsCalendar from "./components/Calendar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          {["/", "/customers"].map((path) => (
            <Route path={path} element={<CustomerList />} />
          ))}
          
          <Route path="/trainings" element={<GetTrainingsList />} />
          <Route path="/calendar" element={<TrainingsCalendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
