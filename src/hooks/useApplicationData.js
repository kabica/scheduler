//useApplicationData.js
import axios from 'axios';
import  { useEffect, useReducer } from "react";
const { v } = require('components/helpers/helperData.js');
const { reducer,  initial } = require('reducers/application.js')
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);


// PRIMARY COMPONENT RESPONSIBILTIES = useEffect : INITIAL STATE UPDATE + socket: ASYNC UPDATE
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
    };
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
      // .then(() => dispatchState({ type: v.SET_ASYNC , value: { interview, id}}))
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