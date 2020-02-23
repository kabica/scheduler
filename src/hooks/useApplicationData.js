import axios from 'axios';
import  { useEffect, useReducer } from "react";
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
const { v } = require('components/helpers/helperData.js');

//USED TO AUTO-SELECT THE CURRENT DAY ON INITIAL PAGE LOAD 
const initial = {
  day: v.week[ v.today.getDay() ],
  days: [],
  appointments: {},
  interviewers: {}
};

// USE STATE.DAY DEFAULT VALUE (above) TO GET TODAY OBJECT
const getToday = function (today, days) {
  for( const day of days) {
    if(day.name === today){
      return (day.id - 1)
    }
  }
  };

// LOOKUP OBJECT FOR STATE UPDATE 
const reduxObj = {
  setDay : (state, action) => {
    return { ...state, day: action.day};
  },
  setApplication : (state, action) => {
    return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers   };
  },
  setInterview : (state , action) => {
    return { ...state, appointments:action.appointments, days:action.days  };
  },
  setAsync : (state , action) => {
    let spots = 0;
    const ID = action.id;
    const days = [ ...state.days ];
    const todayID = getToday(state.day, state.days);

    const appointments = {
      ...state.appointments,
      [ID]: {
      ...state.appointments[ID],
      interview: action.interview ? { ...action.interview } : null
      }
    };
    
    const todayApps = days[todayID].appointments;
    todayApps.forEach(app => {
      let current = appointments[app]
      if (!current.interview || !Object.keys(current.interview).length) {
        spots++;
      }
    });

    days[todayID] = {
      ...state.days[todayID],
      spots: spots
    };

    return { ...state, appointments:appointments, days:days};
  }
};

// REDUCER FOR STATE UPDATE via LOOKUP
const reducer = (state, action) => {
  return reduxObj[action.type] ? reduxObj[action.type](state, action.value) : state
};

// PRIMARY COMPONENT -- useEffect : RESPONSIBLE FOR INITIAL STATE UPDATE  socket: RESPONSIBLE FOR ASYNC UPDATE
export default function useApplicationData() {
  const [state, dispatchState] = useReducer(reducer, initial);

  useEffect(() => {
    socket.onmessage = event => {
      console.log(`Message Received: ${event.data}`);
      const fromServer = JSON.parse(event.data)
      if(fromServer.type === "SET_INTERVIEW") {
        const id = fromServer.id;
        const interview = fromServer.interview
        dispatchState({ type: v.SET_ASYNC , value: { interview, id}})
      }
    }; socket.send('ping');

    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ])
    .then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatchState({ type: v.SET_APPLICATION , value: { days, appointments, interviewers}})});
  }, []);


  // SAVE NEW INTERVIEW TO DB - POPULATE APPOINTMENT OBJECT 
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, appointment)
    );
  };

  // DELETE EXISTING INTERVIEW FROM DB -- webSocket will ASYNC UPDATE UI
  const cancelInterview = function (ID) {
    return Promise.resolve(axios.delete(`/api/appointments/${ID}`));
  };

  const setDay = function(day) {
    dispatchState({type: v.SET_DAY , value: {day}})
  }

 return { state, setDay, bookInterview, cancelInterview };
};