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

const action = { type: "ADD_TODO", text: "hello" };


const dispatchAndLog = (store, action) => {
  console.log('dispatching', action);
  store.dispatch(action);
  console.log('next state', store.getState());
};

dispatchAndLog(store, action);


dispatchAndLog(store, { type: "ADD_TODO", text: "world" });
dispatchAndLog(store, { type: "INCREMENT" });
dispatchAndLog(store, { type: "INCREMENT" });
dispatchAndLog(store, { type: "DECREMENT" });
// unsubscribe();
dispatchAndLog(store, { type: "DECREMENT" });
// console.log(store.getState());
