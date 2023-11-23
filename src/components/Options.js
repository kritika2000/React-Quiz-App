import React, { useEffect, useState } from 'react';
import Option from './Option';

function Options({ questions, currentQues, dispatch }) {
  const [state, setState] = useState({
    optionSelected: null,
    status: 'not-attempted',
  });

  const payload = {
    ifCorrect: state.status === 'correct' ? true : false,
    points:
      state.status === 'correct' ? questions[currentQues.index]?.points : 0,
  };

  useEffect(() => {
    // Use Effect Running 2 times in development mode.
    if (state.status !== 'not-attempted')
      dispatch({ type: 'updateResults', payload });
  }, [state]);

  function handleOptionClick(optionNumber, correctOption) {
    if (state.status === 'not-attempted') {
      if (correctOption === optionNumber) {
        setState({
          optionSelected: optionNumber,
          status: 'correct',
        });
      } else {
        setState({
          optionSelected: optionNumber,
          status: 'incorrect',
        });
      }
    }
  }
  return (
    <div className="optionsContainer">
      {questions[currentQues.index]?.options.map((option, index) => (
        <Option
          key={index}
          {...state}
          questions={questions}
          currentQues={currentQues}
          optionNumber={index}
          onClick={handleOptionClick}
        >
          {option}
        </Option>
      ))}
    </div>
  );
}

export default Options;
