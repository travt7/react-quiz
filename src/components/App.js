import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [], //by default, empty array
  status: "loading", //to tell user that questions are being fetched. Status of
  //the application that will change throughout time. 'loading', 'error",
  //'ready' once the data has arrived and we are ready to start the quiz so I need to display
  //the questions on the UI. Error if retrieving the data failed.
  //'active' once the quiz is running, and 'finished' state. Instead of
  //isLoading, isError, isActive etc. Inside the status, we can tell the
  //app what is currently going on. NICE TECHNIQUE.

  //Need to keep track of which question is the current one. I will use this index to take a
  //certain question object out of the questions array. When the index changes to display the
  //next question the screen will rerender. That's why it needs to be a state variable. Pass in
  //index to our Question component in order to get the right question from questions array.
  index: 0,
  answer: null, //no answer initially but need an action to update answer state.
};

function reducer(state, action) {
  //test for different types
  switch (action.type) {
    case "dataReceived":
      //return a new state object with the questions and status properties updated. So we updated
      //the questions and status states by dispatching the one dataReceived
      return {
        ...state, //get current state
        questions: action.payload, //set questions property to data received from fetch
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    //dispatch an action from the button on StartScreen. Need access to the dispatch function
    //in StartScreen component. Pass it in to the StartScreen instance in App's JSX.
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
      };
    default:
      throw new Error("Action unknown");
  }
} //all of these situations will be conditionally displayed inside the Main component's instance
//in the App's JSX

export default function App() {
  //load questions data on mount
  //pretend we are loading the quiz questions from somewhere. creating a
  //fake API using an npm package called JSON server.
  const [/* state */ { questions, status, index, answer }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(function () {
    //returns a res on mount that I need to convert to json which will then return another promise so I chain
    //another then handler that should then give us our data. At some point I will need to display
    //the data in the UI instead of logging it to the console. I need state in order to do that.
    //Going to use useReducer hook to create that state.
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      //basically creating a data received event which the reducer will then respond to. Payload
      //needed to send the data received from fetch to the reducer. By dispatching this one action object event
      //I updated both the questions and status. I transitioned to a new state by dispatching
      //this simple action object/event.
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {/* {state.status} */}
        {/* conditionally render on state's status property? An easier technique is to destructure
        the state object with nested destructuring up in useReducer hook */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
    //Pass in the index state to our Question component in order to get the right question
    //at the correct index from the questions array. Also need answer/option that was chosen
    //so I can display whether the users answer was correct or not. CSS is going to paint the
    //option with a color.
  );
}
//I am reusing the status state to decide what will be displayed in the <Main> part of the
//App
//I am passing the dispatch function around just like Passing around EH functions or setState
//functions. If I was still using useState then I would create some new EH above return statement
//then pass the EH into the StartScreen. But now handling all of the state transitions in the
//reducer.
