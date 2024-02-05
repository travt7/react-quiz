import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";

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
  //Moving to the next question means moving to the next index.
  index: 0, //index determines which question is read and appears in UI**
  answer: null, //no answer initially but need an action to update answer state.
  //points for correct answers need to update on the screen. Need state variable.
  points: 0, //Where do we update these points? Makes sense to update the points in the same
  //place where we received the newAnswer.
};

function reducer(state, action) {
  //test for different types
  switch (action.type) {
    case "dataReceived":
      //return a new state object with the questions and status properties updated. So we updated
      //the questions and status states by useEffect dispatching the action.type dataReceived
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
      //We don't have the current question stored in the state. We only know the index given by
      //the map function in Options class dispatched as the payload data to the answer property.
      //in this case 'newAnswer'. That only happens if user clicks on one of the buttons.
      const question = state.questions.at(state.index); //leveraging the current state's index
      //property to give us the current element in the state.questions array that the reducer
      //receives. With this variable we know the current question and can check if the current
      //question is equal to the received answer that we have from the onClick attribute calling
      //dispatch function and passing the index from map as the action.payload data.
      //Then compute the next state.
      //It's better for this logic to be in the reducer than in the place where the event is
      //first handled(Options component).
      return {
        ...state,
        answer: action.payload, //answer from the user(0,1,2,3 index from map)
        //How do I award the points only if the answer is correct? Figure out which is the current
        //question. Find out if the answer is correct. If correct ONLY then do we add the points for
        //that correct answer to the current points.
        points:
          //does the index of the mapping function(payload) === correctOption property on the current
          //question object: state.questions.at(state.index). Then add the current question
          //object's points property(from API) to points state.
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        //each question object has a points property and it's value is the number of points
        //awarded for a particular question.
      };
    //creating another possible action in the reducer for next question
    case "nextQuestion":
      return {
        //all we want to change is the index state property and then create button to do it
        ...state,
        index: state.index + 1,
        answer: null,
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
  const [/* state */ { questions, status, index, answer, points }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length; //number of questions in the quiz. Derive state.
  //What is max amount of points user can achieve? Derived state again. We can compute max
  //points from the questions array points property.
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  //reduce method bc we want to reduce into one single value to display. This callback always
  //gets the previous value(0 at the beginning) and the current value of the questions array
  //as the 1st argument.2nd argument is the initial value(0 in our case here).

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
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points} //need current points state displayed out of max possible
              maxPossiblePoints={maxPossiblePoints} //Derive state
              answer={answer}
            />
            <Question
              question={questions[index]} //index determines which question appears in UI. Passing
              //in the questions object that corresponds to the current index.
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
            {/* also want to always display the button if quiz status state is active. but the
            button component will only render the <button> element itself if there has been an
            answer. Can do conditional rendering a couple of ways but here I will do it inside
            the button. So I will allow NextButton to decide if it wants to render itself or not.
            Need to dispatch an action to change index state. */}
          </>
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
