import  React from 'react';
import { useState } from 'react';
import Button from 'components/Button/Button';
import InterviewerList from 'components/InterviewerList/InterviewerList';

// INITIALIZE STATE OBJECT 
export default function Form(props) {
  const initial = {
    name: '',
    valid: false, 
    interviewer: props.interviewer || null
  };
  const [state, setState] = useState({initial});

  // CLEAR THE CURRENTLY SELECTED INTERVIEW FROM LIST 
  const reset = function () {
    setState({...state, valid: true, interviewer: null});
  };
  // CLEAR TEXT INPUT FIELD AND RESET AS ABOVE 
  const cancel = function () {
    reset();
    props.onCancel();
  };


  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
      <input
        className={state.valid ? "appointment__create-input text--semi-bold" : "appointment__nuhuh"}
        name="name"
        value={state.name || ''}
        onChange={(event) => {setState({name: event.target.value, valid: event.target.value.length ? true : false})}}
        type="text"
        placeholder="Enter Student Name"
        /*
          // THIS IS A CONTROLLED COMPONENT:
          // value={stae.name || ''} ensures that on initial render, name is never undefined and therefore
          // ensures that value is always a controlled component. The onChange would throw an error when value 
          // becomes a controlled component again once a user types 
        */
      />
      </form>
      <InterviewerList interviewers={props.interviewers}  value={state.interviewer} onChange={(value) => setState({...state, interviewer: value})}/>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={state.valid && state.interviewer ? () => props.onSave(state.name, state.interviewer) : null}confirm>Save</Button>
      </section>
    </section>
    </main>
  );
};