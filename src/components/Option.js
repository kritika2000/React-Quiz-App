import React from 'react';

function Option({
  optionSelected,
  status,
  questions,
  currentQues,
  optionNumber,
  onClick,
  children,
}) {
  const { correctOption } = questions[currentQues.index];
  let classes = 'option';
  if (status !== 'not-attempted') {
    if (optionNumber === correctOption) classes += ' correct';
    else if (optionNumber === optionSelected && status === 'incorrect') {
      classes += ' incorrect';
    } else classes += ' attempted';
  }
  return (
    <div
      className={classes}
      onClick={() => onClick(optionNumber, correctOption)}
    >
      {children}
    </div>
  );
}

export default Option;
