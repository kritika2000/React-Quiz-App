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
      const correctOption =
        state.questions[state.currentQues.index].correctOption;
      const currentQuesPoints = state.questions[state.currentQues.index].points;
      return {
        ...state,
        currentQues: {
          index: state.currentQues.index,
          optionSelected: action.payload.optionSelected,
        },
        results: {
          numQuestionsAttempted: state.results.numQuestionsAttempted + 1,
          numCorrectAnswers:
            state.currentQues.optionSelected === correctOption
              ? state.results.numCorrectAnswers + 1
              : state.results.numCorrectAnswers,
          pointsGained:
            state.currentQues.optionSelected === correctOption
              ? state.results.pointsGained + currentQuesPoints
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
