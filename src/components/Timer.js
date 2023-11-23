import React, { useState, useEffect, useRef } from 'react';

function Timer({ timeRemaining }) {
  const { minutes, seconds } = timeRemaining;

  return (
    <div className="timer">
      {minutes}:{seconds >= 10 ? seconds : `0${seconds}`}
    </div>
  );
}

export default Timer;
