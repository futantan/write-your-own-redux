const createStore = () => {
  const getState = () => {}
  const subscribe = () => {}
  const dispatch = () => {}

  return {
    getState,
    subscribe,
    dispatch,
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

const store = createStore(counter);

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
unsubscribe();
store.dispatch({ type: "DECREMENT" });
