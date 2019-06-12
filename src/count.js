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

const store = createStore(counter, 0);

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
unsubscribe();
store.dispatch({ type: "DECREMENT" });
console.log(store.getState());
