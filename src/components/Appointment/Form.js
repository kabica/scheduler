import  React  from 'react';
import { useState } from 'react';
import Button from 'components/Button/Button';
import InterviewerList from 'components/InterviewerList/InterviewerList';

// INITIALIZE STATE OBJECT 
export default function Form(props) {
  const initial = {
    name: props.name || '',
    valid: false,
    interviewer: props.interviewer || null,
    error: '',
    int_error: ''
  };
  const [state, setState] = useState({initial});
  const n_err = 'Student name cannot be blank';
  const i_err = 'Interviewer needs to be selected';

  // CLEAR THE CURRENTLY SELECTED INTERVIEW FROM LIST 
  const reset = function () {
    setState({initial});
  };

  // CLEAR TEXT INPUT FIELD AND RESET AS ABOVE 
  const cancel = function () {
    reset();
    props.onCancel();
  };

  // FORM INPUT VALIDATION OCCURS HERE
  const validate = function() {
    console.log('STATE : ', state)
    if(!state.name && !state.interviewer) {
      return setState(state => ({...state, error: n_err, int_error: i_err}));
    }
    if (!state.name) {
      return setState(state => ({...state, error: n_err}))
    }
    if(!state.interviewer) {
      return setState(state => ({...state, int_err: i_err}));
    }
    return props.onSave(state.name, state.interviewer);
  };


  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
      <input
        className={!state.error || state.valid ? "appointment__create-input text--semi-bold" : "appointment__nuhuh"}
        name="name"
        value={state.name || ""}
        onChange={(event) => {setState({...state, name: event.target.value, valid: event.target.value.length ? true : false, error: ''})}}
        type="text"
        placeholder="Enter Student Name"
        data-testid="student-name-input"
        /*
          // THIS IS A CONTROLLED COMPONENT:
          // value={state.name || ''} ensures that on initial render, name is never undefined and therefore
          // ensures that value is always a controlled value within a controlled component. The onChange 
             would throw an error when value 
          // becomes a controlled component again once a user types 
        */
      />
      </form>
      <section className="appointment__validation">{state.error}</section>
      <InterviewerList interviewers={props.interviewers}  value={state.interviewer} onChange={(value) => setState({...state, interviewer: value, int_error: ''})}/>
      {!state.interviewer  && <section className="appointment__validation">{state.int_error}</section>}
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={validate}confirm>Save</Button>
      </section>
    </section>
    </main>
  );
};