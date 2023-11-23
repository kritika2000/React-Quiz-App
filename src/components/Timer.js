import React, { useState, useEffect, useRef } from 'react';

function Timer({ status, dispatch }) {
  const [{ minutes, seconds }, setTimeRemaining] = useState({
    minutes: 5,
    seconds: 0,
  });
  const timeoutID = useRef(null);

  useEffect(() => {
    if (!minutes && !seconds) {
      dispatch({ type: 'stopQuiz' });
    }
  }, [seconds]);

  useEffect(() => {
    console.log(status);
    if (status === 'active') {
      timeoutID.current = setTimeout(() => {
        setTimeRemaining((prev) => ({
          minutes: !prev.seconds ? prev.minutes - 1 : prev.minutes,
          seconds: prev.seconds === 0 ? 59 : prev.seconds - 1,
        }));
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutID.current);
    };
  }, [status, seconds]);

  return (
    <div className="timer">
      {minutes}:{seconds >= 10 ? seconds : `0${seconds}`}
    </div>
  );
}

export default Timer;
