import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Start week from monday
moment.locale('ko', {
    week: {
        dow: 1,
        doy: 1,
    },
});
const localizer = momentLocalizer(moment);

export default function TrainingsCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => fetchData, []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => {
        if (response.ok) return response.json();
        else alert("something went wrong while fetching data");
      })
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  };

const calendarEvents = events.map(event => {
    return {
        start: new Date(event.date),
        end: moment(event.date).add(event.duration, 'm').toDate(),
        title: event.activity + " with " + event.customer.firstname + " " + event.customer.lastname
    }
})
  

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
       
        startAccessor="start"
        endAccessor="end"
        resizable
        style={{ height: 500, margin: "30px" }}
      />
    </div>
  );
}
