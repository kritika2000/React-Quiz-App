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

// https://www.digitalocean.com/community/tutorials/json-server

const initialState = {
  questions: [],
  status: 'loading',
  started: false,
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
  const [questions, status, currentQues, results, dispatch] =
    useQuiz(initialState);
  const numQuestions = questions.length;

  return (
    <div className="app">
      <Header />
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && (
        <StartScreen
          numQuestions={numQuestions}
          onClick={() => dispatch({ type: 'startQuiz' })}
        />
      )}
      {status === 'finished' && (
        <FinishScreen
          pointsGained={results.pointsGained}
          onClick={() => dispatch({ type: 'restart', payload: initialState })}
        />
      )}
      {status === 'active' && (
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
              <Timer dispatch={dispatch} status={status} />
              {currentQues.optionSelected !== null && (
                <Next
                  onClick={() =>
                    currentQues.index < questions.length - 1
                      ? dispatch({ type: 'nextQues' })
                      : dispatch({ type: 'stopQuiz' })
                  }
                >
                  {currentQues.index === questions.length - 1
                    ? 'Submit'
                    : 'Next'}
                </Next>
              )}
            </Controls>
          </Quiz>
        </>
      )}
    </div>
  );
}

export default App;
