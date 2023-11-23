import React from 'react';

function Option({ questions, currentQues, optionNumber, onClick, children }) {
  const { correctOption } = questions[currentQues.index];
  let classes = 'option';
  console.log(currentQues);
  if (currentQues.optionSelected !== null) {
    if (optionNumber === correctOption) {
      classes += ' correct';
    } else if (optionNumber === currentQues.optionSelected)
      classes += ' incorrect';
    else classes += ' attempted';
  }
  return (
    <div className={classes} onClick={() => onClick(optionNumber)}>
      {children}
    </div>
  );
}

export default Option;
