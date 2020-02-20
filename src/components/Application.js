import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay , getInterview , getInterviewersForDay} from "components/helpers/selector";


const axios = require('axios');



export default function Application(props) {
  let today = new Date();
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const setDay = day => setState(prev => ({ ...prev, day }));
  
  const [state, setState] = useState({
    day: week[ today.getDay() ],
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    let URL1 = "/api/days"
    let URL2 = "api/appointments"
    let URL3 = "api/interviewers"
    const promise1 = axios.get(URL1);
    const promise2 = axios.get(URL2);
    const promise3 = axios.get(URL3);

    Promise.all([promise1, promise2, promise3]).then(results => {
      setState(prev => (
        { day: state.day, days: results[0].data, appointments: results[1].data, interviewers: results[2].data}))
        })}, [state.day]);

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, appointment)
      .then(() =>
        setState({
          ...state,
          appointments
        })
      )
      )
    };
    function cancelInterview(ID) {
      console.log(ID);
      const appointment = {
        ...state.appointments[ID],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [ID]: appointment
      };
      return Promise.resolve(
        axios.delete(`/api/appointments/${ID}`)
        .then(() =>
          setState({
            ...state,
            appointments
          })
        )
        )
    }

  return (
  <main className="layout">
    <section className="sidebar">
    <img
      className="sidebar--centered"
      src="images/logo.png"
      alt="Interview Scheduler"
    />
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
      <DayList
      days={state.days}
      day={state.day}
      setDay={setDay}/>
    </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    />
    </section>
    <section className="schedule">
    {
    getAppointmentsForDay(state, state.day).map((appointment) => {
      const interview = getInterview(state, appointment.interview)
      const interviewers = getInterviewersForDay(state, state.day)
      return (
        
            <Appointment
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewers}
              
            />
      )})
      }
      <Appointment key="last" time="5pm" />
    </section>
  </main>
    
  );
}
