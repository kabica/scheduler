import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "components/InterviewerList/InterviewerListItem";
import "components/InterviewerList/InterviewerList.scss";

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(value => 
      <InterviewerListItem
        key={value.id}
        name={value.name}
        avatar={value.avatar}
        selected={value.id === props.value}
        setInterviewer={event => props.onChange(value.id)}
      />
    );

return (
<section className="interviewers">
<h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>)
};