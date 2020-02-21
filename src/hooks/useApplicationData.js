import { useEffect, useState } from "react";
const axios = require('axios');

export default function useApplicationData () {
  let today = new Date();
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
  })}, []);

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
}
