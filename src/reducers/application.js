//application.js
const { v } = require('components/helpers/helperData.js');


// USE STATE.DAY DEFAULT VALUE (above) TO GET TODAY OBJECT
const getToday = function (today, days) {
  for( const day of days) {
    if(day.name === today) return (day.id - 1)
  }};

//USED TO AUTO-SELECT THE CURRENT DAY ON INITIAL PAGE LOAD 
export const initial = {
  day: v.week[ v.today.getDay() ],
  days: [],
  appointments: {},
  interviewers: {}
};

// REDUCER FOR STATE UPDATE via LOOKUP
export const reducer = (state, action) => {
  return reduxObj[action.type] ? reduxObj[action.type](state, action.value) : state
};

/* LOOKUP OBJECT FOR STATE UPDATE
 * Before captures the value of interview before the websocket-triggered state update (null || {interview})
 *   if(Before = null && After = {interview}) --> New appointment added, decrease spots by 1
 *   if(Before = {interview} && After = {interview}) --> Appointment updated, no change to spots 
 *   if(Before = {interview}) && After = null) --> Exisiting appointment deleted, increase spots by 1
 */
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
    const ID = action.id;
    const days = [ ...state.days ];
    const todayID = getToday(state.day, state.days);
    let before = state.appointments[ID].interview;

    const appointments = {
      ...state.appointments,
      [ID]: {
      ...state.appointments[ID],
      interview: action.interview ? { ...action.interview } : null
      }
    };

    let current = state.days[todayID].spots;
    days[todayID] = {
      ...state.days[todayID],
      spots: before && action.interview ? current : !before ? --current : ++current
    };

    return { ...state, appointments:appointments, days:days};
  }
};

