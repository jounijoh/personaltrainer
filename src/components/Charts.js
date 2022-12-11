import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Charts() {
  // GET TRAINING DATA
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

  // ADD DURATIONS ON SAME ACTIVITY TOGETHER
  const trainingData = [];

  trainings.forEach((training) => {
    const index = trainingData.findIndex(
      (obj) => obj.activity === training.activity
    );
    if (index > -1 && training.activity) {
      trainingData[index].duration += training.duration;
    } else {
      trainingData.push({
        activity: training.activity,
        duration: training.duration,
      });
    }
  });
  // Transform data to readable from for charts
  const pieData = [["Trainings", "Duration"]];
  trainingData.forEach((item) => pieData.push([item.activity, item.duration]));

  const options = {
    title: "Trainings",
    pieHole: 0.4,
    is3D: false,
  };

  return (
    <Chart
      chartType="PieChart"
      data={pieData}
      options={options}
      width="80%"
      height="400px"
      legendToggle
    />
  );
}
