import React from "react";
import "components/DayList/DayListItem.scss";
var classNames = require('classnames');


const formatSpots = function (spots) {
  if(spots === 0) return "no spots remaining";
  return spots === 1 ? `${spots} spot remaining` : `${spots} spots remaining`;
}
export default function DayListItem(props) {
  let itemClass = classNames({
    'day-list__item': true,
    ' day-list__item--selected': props.selected,
    ' day-list__item--full': props.spots === 0,
  });
  

  return (
    <li className={itemClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}



