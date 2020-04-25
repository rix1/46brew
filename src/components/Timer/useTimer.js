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

export function useTimer(multiplier: number = 1, onChange: () => void) {
  // const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('ready');
  const [time, setTime] = useState(0);

  useInterval(
    () => {
      setTime(time + 1);
    },
    status === 'running' ? 1000 / multiplier : null,
  );

  function toggleTimer() {
    switch (status) {
      case 'ready':
      case 'paused':
        return setStatus('running');
      case 'running':
        return setStatus('paused');
      case 'done':
        return setStatus('ready');
      default:
        throw new Error(`Status ${status} not supported`);
    }
  }

  function stop() {
    setTime(0);
    setStatus('done');
  }

  return {
    time,
    isRunning: status === 'running',
    toggleTimer,
    stop,
  };
}
