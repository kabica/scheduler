import axios from 'axios';
import  { useEffect, useReducer } from "react";

//USED TO AUTO-SELECT THE CURRENT DAY ON INITIAL PAGE LOAD 
const today = new Date();
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SET_APPLICATION = "setApplication";
const SET_INTERVIEW = "setInterview";
const SET_DAY = "setDay";

const initial = {
  day: week[ today.getDay() ],
  days: [],
  appointments: {},
  interviewers: {}
};

const reduxObj = {
  setDay : (state, action) => {
    return { ...state, day: action.day};
  },
  setApplication : (state, action) => {
    return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers   };
  },
  setInterview : (state , action) => {
    return { ...state, appointments:action.appointments, days:action.days  };
  }
};
const reducer = (state, action) => {
  if (reduxObj[action.type]) {
    return reduxObj[action.type](state, action.value);
  } else {
    return state;
  }
};

export default function useApplicationData() {
  const [state, dispatchState] = useReducer(reducer, initial);

  const setDay = function(day) {
    dispatchState({type: SET_DAY , value: {day}})
  }

  // RESPONSIBLE FOR INITIAL STATE UPDATE ON SERVER LOAD 
  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
      Promise.resolve(promise3),
    ])
    .then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatchState({ type: SET_APPLICATION , value: { days, appointments, interviewers}})});
  }, []);

  // USE STATE.DAY DEFAULT VALUE (above) TO GET TODAY OBJECT
  const getToday = function (today, days) {
  for( const day of days) {
    if(day.name === today){
      return (day.id - 1)
    }
  }
  };

  // SAVE NEW INTERVIEW TO DB - POPULATE APPOINTMENT OBJECT 
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
    }; state.days[todayID] = day;

    const days = [...state.days]
    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, appointment)
      .then(dispatchState({ type: SET_INTERVIEW , value: { appointments, days}}))
    );
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
  const dayID = getToday(state.day, state.days);
  const day = {
    ...state.days[dayID],
    spots: state.days[dayID]['spots'] + 1
  }; 

  state.days[dayID] = day;
  const days = [...state.days];

  return Promise.resolve(axios.delete(`/api/appointments/${ID}`)
    .then(dispatchState({ type: SET_INTERVIEW , value: { appointments, days}}))
    );
};

 return { state, setDay, bookInterview, cancelInterview };
};