import { useState, useEffect } from 'react';
import axios from "axios";

const useApplicationData = () => {
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
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
      Promise.resolve(promise3),
    ]).then((all) => {
      
      const [days, appointments, interviewer] = all;
      
      setState(prev => ({ day: state.day, days: days.data, appointments: appointments.data, interviewers: interviewer.data}))
    });
  }, []);

 

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

    const cancelInterview = function(ID) {
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
    };


  return { state, setDay, bookInterview, cancelInterview };
}
 
export default useApplicationData;