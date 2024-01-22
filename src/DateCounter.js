import { useReducer } from "react";

//the idea of the reducer is to take the current state+the action
//and based on that return the next state.
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(state, action);

  //return { count: 0, step: 1 };
  //So I have all of the state updates that can happen in this one central place: reducer func.
  //This makes it easy to understand the entire application without having to go into all the
  //different components and all the different functions.
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step }; //the new state object's count property is
    //the previous state object's count property + 1.
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return { count: 0, step: 1 }; //we can update these 2 pieces of state at the same time.
    default:
      throw new Error("Unknown action");
    //need a default in case we get an action type that is not recognized by our switch
  }
  //This creates a shallow copy of the previous state object. It ensures that you
  //don't mutate the original state directly. This updates the count property in the
  //new state object. It takes the previous state's count property and increments it by 1.
  //spread out the entire current state object that has a count property and a step
  //property we received in reducer param. Then override the count property. This is
  //the way we have been updating objects, basically creating a brand new object that
  //contains all info from previous object and then whatever I want to override.
  //if (action.type === "inc") return state + action.payload; //whatever is returned here will become the
  //if (action.type === "dec") return state + action.payload; //whatever is returned here will become the
  //if (action.type === "setCount") return action.payload; //whatever is returned here will become the
  //next state. We have 3 different actions:dec count, inc count, set count by typing
  //into the input field. Should name the actions instead of just passing in a number
  //value and pass in an object that contains the action as well as the number value.
}

function DateCounter() {
  //const [count, setCount] = useState(0);
  //const [step, setStep] = useState(1);
  //useReducer when we have more complex state to manage. Not just one value so the
  //state will usually be an object.

  const [state, dispatch] = useReducer(reducer, initialState); //since initialState is
  //now a state object with count and step properties we'll call it just state.
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  //setCount is a function provided by the useState hook,
  //and it is used to update the state variable count. It's not a method of the DateCounter component itself,
  //but rather a function returned by the useState hook to update the state.
  const dec = function () {
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
  };

  const defineCount = function (e) {
    //setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    //setStep(Number(e.target.value));//no longer exists
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    //setCount(0);
    //setStep(1); We had to take the 2 state setters and call both of them. But now we can do
    //one big state transition that does all of that at the same time.
    dispatch({ type: "reset" }); //don't need to pass any data into the reducer. Will do it
    //right inside the reducer function.
  };
  //onChange is an event attribute in React, and it is similar to an event listener
  //in traditional JavaScript.the onChange attribute is assigned the defineStep
  //function, which will be called whenever the value of the range input changes.
  //The defineStep function is then responsible for handling the event (in this case, the
  //change in the input value) and performing some action, such as updating the state.
  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
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
