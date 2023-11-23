import { useReducer, useEffect } from 'react';
import quizReducer from '../reducers/quizReducer';

function useQuiz(initialState) {
  const [{ questions, status, currentQues, results }, dispatch] = useReducer(
    quizReducer,
    initialState
  );

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

  return [questions, status, currentQues, results, dispatch];
}

export default useQuiz;
