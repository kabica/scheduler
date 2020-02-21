import React from "react";
import "components/Appointment/styles.scss";
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Header from 'components/Appointment/Header';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import Edit from 'components/Appointment/Edit';
import useVisualMode from "hooks/useVisualMode";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const ERROR_SAVING = 'ERROR_SAVING';
const CONFIRM = 'CONFIRM'
const DELETING = 'DELETING';
const ERROR_DELETING = 'ERROR_DELETING';
const EDIT = 'EDIT'
const UPDATING = 'UPDATING'
const ERROR_UPDATE = 'ERROR_UPDATE'

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() =>
        transition(ERROR_SAVING, true)
    )
  };

  // async function setSaveMode (mode) {
  //   await asyncTransition(mode)
  // }

  function cancel() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() =>
      transition(ERROR_DELETING, true)
    )

  }

  function update(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(UPDATING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => 
      transition(ERROR_UPDATE)
    )

  }
  
  return (
  <article className="appointment">
    <Header time={props.time} />  
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={() => transition(EDIT)}
      onDelete={() => transition(CONFIRM)}
    />
    )}
    {mode === SAVING && (
    <Status
      message='Saving'
    />
    )}
    {mode === CREATE && (
    <Form
      onSave={save}
      interviewers={props.interviewers}
      onCancel = {() => back()}
    />
    )}
    {mode === EDIT && (
    <Edit
      onSave={update}
      interviewers={props.interviewers}
      name={props.interview.student}
      onCancel = {() => back()}
    />
    )}
  
    {mode === DELETING && (
    <Status
      message='Deleting'
    />
    )}
    {mode === CONFIRM && (
    <Confirm
      message='Are you really bout dis'
      onCancel={() => back()}
      onConfirm={cancel}
    />
    )}
    {mode === UPDATING && (
    <Status
      message='Updating..'
    />
    )}
    {mode === ERROR_UPDATE && (
    <Error
      message='Error during save'
      onClose={() => transition(SHOW)}
    />
    )}
    {mode === ERROR_SAVING && (
    <Error
      message='Error during save'
      onClose={() => back()}
    />
    )}
    {mode === ERROR_DELETING && (
    <Error
      message='Error during delete'
      onClose={() => transition(SHOW)}
    />
    )}
  
  </article>
  );
};




// {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}