function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'startQuiz':
      return {
        ...state,
        status: 'active',
      };
    case 'stopQuiz':
      return {
        ...state,
        status: 'finished',
      };
    case 'setTime':
      return {
        ...state,
        timeRemaining: {
          minutes: !state.timeRemaining.seconds
            ? state.timeRemaining.minutes - 1
            : state.timeRemaining.minutes,
          seconds:
            state.timeRemaining.seconds === 0
              ? 59
              : state.timeRemaining.seconds - 1,
        },
      };
    case 'nextQues':
      return {
        ...state,
        currentQues: {
          index:
            state.currentQues.index < state.questions.length
              ? state.currentQues.index + 1
              : state.currentQues.index,
          optionSelected: null,
        },
      };
    case 'updateResults':
      const { correctOption, points } =
        state.questions[state.currentQues.index];
      return {
        ...state,
        currentQues: {
          index: state.currentQues.index,
          optionSelected: action.payload.optionSelected,
        },
        results: {
          numQuestionsAttempted: state.results.numQuestionsAttempted + 1,
          numCorrectAnswers:
            action.payload.optionSelected === correctOption
              ? state.results.numCorrectAnswers + 1
              : state.results.numCorrectAnswers,
          pointsGained:
            action.payload.optionSelected === correctOption
              ? state.results.pointsGained + points
              : state.results.pointsGained,
        },
      };
    case 'restart':
      return {
        ...action.payload,
      };
    default:
      throw new Error('Unknown');
  }
}

export default reducer;
