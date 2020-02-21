import React from "react";
import "components/InterviewerList/InterviewerListItem.scss";
var classNames = require('classnames');

export default function InterviewerListItem(props) {
  let itemClass = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': props.selected,
    // 'interviewers__item--selected-image' : props.selected && props.avatar
  });

  return (
    <li className={itemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>  
  );
};


