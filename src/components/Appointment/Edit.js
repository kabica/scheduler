import  React from 'react';
import { useState } from 'react';
import Button from 'components/Button/Button';
import InterviewerList from 'components/InterviewerList/InterviewerList';


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function () {
    setName('');
    setInterviewer(null);
  }
  const cancel = function () {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder={props.name}
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers}  value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={() => props.onSave(name, interviewer)}confirm>Save</Button>
    </section>
  </section>
</main>
  );
};
