//with my rfc snippet I can create this rapidly

//need access to the dispatch function so that when I click on Let's Start button I dispatch
//an action object with type property 'start' so I can change the state's status property to
//'active'. Call dispatch function with the action I want to dispatch.
function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
//The length of the questions array is X but where do we calculate it?
//In the initialState is not necessary. We can calculate derived state
//right in the App component where the state lives. Calculate it from
//the questions array itself. Then pass it to the instance of StartScreen
//the App's JSX.

export default StartScreen;
