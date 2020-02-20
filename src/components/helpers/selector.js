
export function getAppointmentsForDay(state, day) {
  let result = [];
  let today = state.days.filter(val => val.name === day);
  if(today.length === 0) return result;
  
  let todayKeys = today[0].appointments;
  todayKeys.forEach(val => {
    result.push(state.appointments[val])
  })

  return result;
};

export function getInterviewersForDay(state, day) {
  let result = [];
  let today = state.days.filter(val => val.name === day);
  if(today.length === 0) return result;
 
  result = today[0].interviewers.map(someGuy => (state.interviewers[someGuy]))
  return result;
};




export function getInterview(state, interview) {
  return  interview ? {'student' : interview.student , 'interviewer' : state.interviewers[interview.interviewer]} : null;
};
