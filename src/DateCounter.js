import { useReducer } from 'react';

function countReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case 'increment': {
      return {
        ...state,
        count: state.count + state.step,
      };
    }
    case 'decrement': {
      return {
        ...state,
        count: state.count - state.step,
      };
    }
    case 'defineCount': {
      return {
        ...state,
        count: action.payload,
      };
    }
    case 'defineStep': {
      return {
        ...state,
        step: action.payload,
      };
    }
    case 'reset': {
      return {
        count: action.payload.count,
        step: action.payload.step,
      };
    }
    default:
      throw new Error('Unknown Action');
  }
}

function DateCounter() {
  const initialState = {
    count: 0,
    step: 1,
  };
  const [state, dispatch] = useReducer(countReducer, initialState);
  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    /*  
     In the event handlers, we dispatch the appropriate action,
     which further calls the reducer function and returns the updated state.
    */
    dispatch({
      type: 'decrement',
    });
  };

  const inc = function () {
    dispatch({
      type: 'increment',
    });
  };

  const defineCount = function (e) {
    dispatch({
      type: 'defineCount',
      payload: Number(e.target.value),
    });
  };

  const defineStep = function (e) {
    dispatch({
      type: 'defineStep',
      payload: Number(e.target.value),
    });
  };

  const reset = function () {
    dispatch({
      type: 'reset',
      payload: initialState,
    });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

/**
 * useReducer hook is a more advanced way of managing state,
 * instead of useState hook.
 * It works with a reducer function, which takes in the previous
 * state and actions object and returns the new state based on
 * the current action.
 *
 * The action object can be of any shape,
 * but it is recommended to use add type and payload
 * property.
 * 1. payload is the additional info for updating the state.
 * 2. whatever returned by this reducer function, becomes the new state.
 */

/**
 *    WHY USEREDUCER?
 *
 *   When component and state updates become more complex using useState,
 *   we use useReducer.
 *   Eg:-
 * 1. Some components have a lot of state variables and state updates,
 *    spread across many event handlers all over the component.
 * 2. When multiple state updates need to happen at the same time
 *    (as a reaction to the same event, like 'starting a game').
 *
 *    MANAGING STATE WITH USEREDUCER
 *
 * 1. An alternative way of setting state, ideal from complex state
 *    and related pieces of state.
 *    const [state, dispatch] = useReducer(reducerFn, initialState)
 * 2. Stores related pieces of state in a state object.
 * 3. useReducer needs reducer: function containing all logic
 *    to update state. Decouples state logic from component.
 * 4. reducer: pure function(no side effects) that takes current state and action
 *    and returns the next state.
 * 5. State is immutable in React, so a reducer is not allowed to
 *    mutate the state directly.
 * 6. Action: an object that describer how to update state.
 * 7. dispatch: this function triggers a state update, when we call it
 *    with an action object to the reducer, this reducer then
 *    use this action object to compute the new state.
 */
