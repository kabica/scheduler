import axios from 'axios';
import  { useEffect, useReducer } from "react";

const today = new Date();
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const initial = {
  day: week[ today.getDay() ],
  days: [],
  appointments: {},
  interviewers: {}
}

const SET_DAY = "SET_DAY";
const SET_APPLICATION = "SET_APPLICATION";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, ...action.value  }
    case SET_APPLICATION:
      return { ...state, ...action.value }
    case SET_INTERVIEW: {
      return { ...state, ...action.value }
    }
    default:
      throw new Error(
        `Redux encountered unsupported action: ${action.type}`
      );
  }
}

export default function useApplicationData() {

const [state, dispatch] = useReducer(reducer, initial);

function setDay (day) {
  dispatch({ type: SET_DAY, value: {day} });
} 

function setApp (days, appointments, interviewers) {
  dispatch({ type: SET_APPLICATION, value: { days, appointments, interviewers} });
} 

function setInterview (appointments, days) {
  dispatch({ type: SET_INTERVIEW, value: { appointments, days} });
} 


useEffect(() => {
  const promise1 = axios.get("/api/days");
  const promise2 = axios.get("/api/appointments");
  const promise3 = axios.get("/api/interviewers");

  Promise.all([
    Promise.resolve(promise1),
    Promise.resolve(promise2),
    Promise.resolve(promise3),
  ]).then((all) => {
    const days = all[0].data;
    console.log(days)
    const appointments = all[1].data;
    const interviewers = all[2].data;
    setApp(days, appointments, interviewers)});
}, []);

// 
const getToday = function (today, days) {
for( const day of days) {
  if(day.name === today){
    return (day.id - 1)
  }
}
};

const bookInterview = function(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const todayID = getToday(state.day, state.days);
  const day = {
    ...state.days[todayID],
    spots: state.days[todayID]['spots'] - 1
  };
  state.days[todayID] = day;

  const days = [...state.days]
  return Promise.resolve(
    axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setInterview(appointments, days))
  )
};


const cancelInterview = function (ID) {
  const appointment = {
    ...state.appointments[ID],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [ID]: appointment
  };

  const dayId = getToday(state.day, state.days);
  const day = {
    ...state.days[dayId],
    spots: state.days[dayId]['spots'] + 1
  }
  state.days[dayId] = day;
  const days = [...state.days]

  return Promise.resolve(axios.delete(`/api/appointments/${ID}`)
    .then(() => setInterview(appointments, days))
    )
};

 return { state, setDay, bookInterview, cancelInterview }
}