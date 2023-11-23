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
        started: true,
      };
    case 'stopQuiz':
      return {
        ...state,
        started: false,
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
          ...state.currentQues,
          index:
            state.currentQues.index < state.questions.length
              ? state.currentQues.index + 1
              : state.currentQues.index,
        },
      };
    case 'prevQues':
      return {
        ...state,
        currentQues: {
          ...state.currentQues,
          index:
            state.currentQues.index > 0
              ? state.currentQues.index - 1
              : state.currentQues.index,
        },
      };
    case 'updateResults':
      return {
        ...state,
        results: {
          numQuestionsAttempted: state.results.numQuestionsAttempted + 1,
          numCorrectAnswers: action.payload.ifCorrect
            ? state.results.numCorrectAnswers + 1
            : state.results.numCorrectAnswers,
          pointsGained: state.results.pointsGained + action.payload.points,
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
