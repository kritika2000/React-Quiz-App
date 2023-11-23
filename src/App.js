import React from 'react';
import './App.css';
import Header from './components/Header';
import Progress from './components/Progress';
import Question from './components/Question';
import Controls from './components/Controls';
import Timer from './components/Timer';
import Next from './components/Next';
import Options from './components/Options';
import Quiz from './components/Quiz';
import StartScreen from './components/StartScreen';
import Loader from './components/Loader';
import Error from './components/Error';
import FinishScreen from './components/FinishScreen';
import useQuiz from './hooks/useQuiz';
import Prev from './components/Prev';

// https://www.digitalocean.com/community/tutorials/json-server

const initialState = {
  questions: [],
  status: 'loading',
  started: false,
  timeRemaining: {
    minutes: 0,
    seconds: 10,
  },
  currentQues: {
    index: 0,
    optionSelected: null,
  },
  results: {
    numQuestionsAttempted: 0,
    numCorrectAnswers: 0,
    pointsGained: 0,
  },
};

function App() {
  const [
    questions,
    status,
    started,
    timeRemaining,
    currentQues,
    results,
    dispatch,
  ] = useQuiz(initialState);
  const numQuestions = questions.length;
  console.log(questions, status, started, timeRemaining, currentQues, results);
  return (
    <div className="app">
      <Header />
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' &&
        (!started ? (
          timeRemaining.minutes || timeRemaining.seconds ? (
            <StartScreen
              numQuestions={numQuestions}
              onClick={() => dispatch({ type: 'startQuiz' })}
            />
          ) : (
            <FinishScreen
              pointsGained={results.pointsGained}
              onClick={() =>
                dispatch({ type: 'restart', payload: initialState })
              }
            />
          )
        ) : (
          <>
            <Progress
              numQuestions={numQuestions}
              points={results.pointsGained}
              numQuestionsAttempted={results.numQuestionsAttempted}
            />
            <Quiz>
              <Question>{questions[currentQues.index]?.question}</Question>
              <Options
                key={currentQues.index}
                currentQues={currentQues}
                questions={questions}
                dispatch={dispatch}
              />
              <Controls>
                <Timer timeRemaining={timeRemaining} />
                <Prev
                  onClick={() => dispatch({ type: 'prevQues' })}
                  disable={currentQues.index === 0}
                />
                <Next
                  onClick={() => dispatch({ type: 'nextQues' })}
                  disable={currentQues.index === questions.length - 1}
                />
              </Controls>
            </Quiz>
          </>
        ))}
    </div>
  );
}

export default App;
