import React from 'react';
import Option from './Option';

function Options({ questions, currentQues, dispatch }) {
  function handleOptionClick(optionNumber) {
    if (!currentQues.optionSelected) {
      dispatch({
        type: 'updateResults',
        payload: { optionSelected: optionNumber },
      });
    }
  }
  return (
    <div className="optionsContainer">
      {questions[currentQues.index]?.options.map((option, index) => (
        <Option
          key={index}
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
