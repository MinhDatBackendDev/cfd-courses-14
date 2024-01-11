const initState = 0;

const countReducer = (state = initState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return state - action.payload;

    default:
      return state;
  }
};

export default countReducer;
