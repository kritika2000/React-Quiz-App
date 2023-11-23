import React from 'react';

function Progress({ numQuestions, numQuestionsAttempted, points }) {
  const questionsAttempted = numQuestionsAttempted;
  const totalQuestions = numQuestions;
  const totalPoints = 280;

  const progressStyle = {
    width: `${(questionsAttempted * 100) / totalQuestions}%`,
    height: '100%',
  };
  return (
    <div className="progressBar">
      <div className="bar">
        <div className="progress" style={progressStyle}></div>
      </div>
      <p className="progressBar__questionsAttempted">
        Questions <b>{questionsAttempted}</b> / {totalQuestions}
      </p>
      <p className="progressBar__points">
        <b>{points}</b> / {totalPoints} points
      </p>
    </div>
  );
}

export default Progress;
