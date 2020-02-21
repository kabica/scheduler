import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // replace ? setHistory([]) : setHistory([...history, newMode]);
  function transition(newMode, replace) { 
    setMode(newMode);
    replace ? setHistory([...history, newMode]) : setHistory((history) =>  [...history, newMode] )
  }

  function back() { 
    const modeIndex = history.indexOf(mode) - 1;
    (history.length === 1) ? setMode(mode) : setMode(history[modeIndex])
  }
  // function back() { 
  //   if (history.length === 1) {
  //     setMode(history[0]);
  //   } else {
  //     const popHistory = [...history];
  //     popHistory.pop();
  //     setMode(popHistory[popHistory.length - 1]);
  //     setHistory(prev => ([...prev]));
  //   }
  // }

  return { mode, transition, back };
};



