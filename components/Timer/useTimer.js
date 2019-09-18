// @flow
import { useRef, useState, useEffect } from 'react';

function useInterval(callback: Function, delay: ?number) {
  const savedCallback = useRef();

  // On mount: save the function to run on after each interval
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    let id;
    if (delay) {
      id = setInterval(tick, delay);
    }
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [delay]);
}

export function useTimer(multiplier: number = 1) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useInterval(
    () => {
      setTime(time + 1);
    },
    isRunning ? 1000 / multiplier : null,
  );

  function toggleTimer() {
    setIsRunning(!isRunning);
  }

  function reset() {
    setTime(0);
    setIsRunning(false);
  }

  return {
    time,
    isRunning,
    toggleTimer,
    reset,
  };
}
