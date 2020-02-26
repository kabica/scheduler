import React , {useEffect} from "react";
import "components/Appointment/styles.scss";
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Edit from 'components/Appointment/Edit';
import Empty from 'components/Appointment/Empty';
import Error from 'components/Appointment/Error';
import Header from 'components/Appointment/Header';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import useVisualMode from "hooks/useVisualMode";

// CONSTANTS HAVE BEEN REFACTORED TO SEPARATE FILE FOR CLEANLINESS
// SHORT VAR NAME WAS USED (v) TO MAINTAIN READABILITY
const { v } = require('components/helpers/helperData.js');

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? v.SHOW : v.EMPTY
  );

  // CREATE NEW APPOINTMENT -- Display error for empty input field
  function save(name, interviewer) {
    console.log('HERE : ', interviewer)
    const interview = {
      student: name,
      interviewer: interviewer
    };
    console.log('INT : ', interview)
    transition(v.SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(v.SHOW))
      .catch(() =>
        transition(v.ERROR_SAVING, true)
      );
  };

  // REMOVE AN ALREADY EXISTING APPOINTMENT
  function cancel() {
    transition(v.DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(v.EMPTY))
    .catch(() =>
      transition(v.ERROR_DELETING, true)
    )
  };

  // UPDATE AN EXISTING APPOINTMENT WITH NEW MEMBERS
  function update(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(v.UPDATING)
    props.bookInterview(props.id, interview)
    .then(() => transition(v.SHOW))
    .catch(() => 
      transition(v.ERROR_UPDATE)
    )
  };
  useEffect(() => {
    if (props.interview && mode === v.EMPTY) {
        transition(v.SHOW);
    }
    if (props.interview === null && mode === v.SHOW) {
     transition(v.EMPTY);
    }
   }, [props.interview, transition, mode]);
  
  return (
  <article className="appointment" data-testid="appointment">
    <Header time={props.time} />  
    {mode === v.EMPTY && (<Empty onAdd={() => transition(v.CREATE)} />)}
    {mode === v.SHOW && props.interview && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={() => transition(v.EDIT)}
      onDelete={() => transition(v.CONFIRM)}
    />
    )}
    {mode === v.SAVING && (
    <Status
      message='Saving'
    />
    )}
    {mode === v.CREATE && (
    <Form
      onSave={save}
      interviewers={props.interviewers}
      onCancel = {() => back()}
    />
    )}
    {mode === v.EDIT && (
    <Edit
      onSave={update}
      interviewers={props.interviewers}
      name={props.interview.student}
      onCancel = {() => transition(v.SHOW)}
    />
    )}
    {mode === v.DELETING && (
    <Status
      message='Deleting'
    />
    )}
    {mode === v.CONFIRM && (
    <Confirm
      message='Are you really bout dis'
      onCancel={() => back()}
      onConfirm={cancel}
    />
    )}
    {mode === v.UPDATING && (
    <Status
      message='Updating..'
    />
    )}
    {mode === v.ERROR_UPDATE && (
    <Error
      message='Error during save'
      onClose={() => transition(v.SHOW)}
    />
    )}
    {mode === v.ERROR_SAVING && (
    <Error
      message='Error during save'
      onClose={() => back()}
    />
    )}
    {mode === v.EMPTY_SAVING && (
    <Error
      message='Error: you need to fill out all fields!'
      onClose={() => back()}
    />
    )}
    {mode === v.ERROR_DELETING && (
    <Error
      message='Error during delete'
      onClose={() => transition(v.SHOW)}
    />
    )}
  
  </article>
  );
};




