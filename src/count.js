const R = require("ramda");

const createStore = (reducer, state) => {
  let storeState = state;
  let listeners = [];

  const getState = () => storeState;
  const dispatch = action => {
    storeState = reducer(storeState, action);
    listeners.forEach(listener => listener());
  };
  const subscribe = listener => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  return {
    getState,
    dispatch,
    subscribe
  };
};

const combineReducer = reducers => {
  return (state = {}, action) => {
    return R.mapObjIndexed(
      (reducer, key) => reducer(state[key], action),
      reducers
    );
  };
};

function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

const combinedReducer = combineReducer({ counter, todos });

const store = createStore(combinedReducer, 0);

// const unsubscribe = store.subscribe(() => console.log(store.getState()));

const action1 = { type: "ADD_TODO", text: "hello" };













console.log('dispatching', action1);
store.dispatch(action1);
console.log('next state', store.getState());


















store.dispatch({ type: "ADD_TODO", text: "world" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
// unsubscribe();
store.dispatch({ type: "DECREMENT" });
// console.log(store.getState());
