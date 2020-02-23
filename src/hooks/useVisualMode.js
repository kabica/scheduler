import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace) { 
    setMode(newMode);
    replace ? setHistory([...history, newMode]) : setHistory((history) =>  [...history, newMode] )
  }

  function back() { 
    const modeIndex = history.indexOf(mode) - 1;
    (history.length === 1) ? setMode(mode) : setMode(history[modeIndex])
  }

  return { mode, transition, back };
};



