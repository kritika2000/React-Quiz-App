import { useReducer, useEffect, useRef } from 'react';
import quizReducer from '../reducers/quizReducer';

function useQuiz(initialState) {
  const [
    { questions, status, started, timeRemaining, currentQues, results },
    dispatch,
  ] = useReducer(quizReducer, initialState);
  const timeoutID = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:8000/questions');
        if (!res.ok)
          throw new Error('Some error ocurred while loading questions!');
        const data = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (err) {
        dispatch({ type: 'dataFailed' });
      }
    })();
  }, [status]);

  useEffect(() => {
    if (started && (timeRemaining.minutes || timeRemaining.seconds)) {
      timeoutID.current = setTimeout(() => {
        dispatch({ type: 'setTime' });
      }, 1000);
    }
    if (started && !timeRemaining.minutes && !timeRemaining.seconds) {
      dispatch({ type: 'stopQuiz' });
    }
    return () => {
      clearTimeout(timeoutID.current);
    };
  }, [started, timeRemaining.seconds]);

  return [
    questions,
    status,
    started,
    timeRemaining,
    currentQues,
    results,
    dispatch,
  ];
}

export default useQuiz;
