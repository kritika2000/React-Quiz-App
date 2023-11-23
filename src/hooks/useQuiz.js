import { useReducer, useEffect, useRef } from 'react';
import quizReducer from '../reducers/quizReducer';

function useQuiz(initialState) {
  const [{ questions, status, timeRemaining, currentQues, results }, dispatch] =
    useReducer(quizReducer, initialState);
  const timeoutID = useRef(null);

  useEffect(() => {
    if (status === 'loading') {
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
    }
  }, [status]);

  useEffect(() => {
    if (
      status === 'active' &&
      (timeRemaining.minutes || timeRemaining.seconds)
    ) {
      timeoutID.current = setTimeout(() => {
        dispatch({ type: 'setTime' });
      }, 1000);
    }
    if (!timeRemaining.minutes && !timeRemaining.seconds) {
      dispatch({ type: 'stopQuiz' });
    }
    return () => {
      clearTimeout(timeoutID.current);
    };
  }, [status, timeRemaining.seconds]);

  return [questions, status, timeRemaining, currentQues, results, dispatch];
}

export default useQuiz;
