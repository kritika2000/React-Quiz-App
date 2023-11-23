import React from 'react';

function StartScreen({ numQuestions, onClick }) {
  return (
    <div className="startScreenContainer">
      <h1 className="startScreen__heading">Welcome to The React Quiz!</h1>
      <h3 className="startScreen__text">
        {`${numQuestions} questions to test your React Mastery`}
      </h3>
      <button className="startScreen__startBtn" onClick={onClick}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
