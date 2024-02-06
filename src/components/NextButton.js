//this component will render the button element if there has been an answer. So the NextButton
//instance in App JSX needs access to the answer state.
function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null; //if no answer return nothing. Otherwise create a button

  if (index < numQuestions - 1) {
    //index is 0 based and numQuestions is not. If index is less than the total number of
    //questions render a next button to the UI. Otherwise we want the FinishScreen.
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  //As soon as I click on this button, the index: state.index + 1 causes a rerender bc of index
  //state change. Also answer state is changed back to null.
  //the case 'nextQuestion' in our switch changes the state.index property
  //if there is an incorrect or correct answer(chosen from Options)we want to change the index
  //state property. This component creates a button element with an onClick attribute to do it.
  if (index === numQuestions - 1) {
    //index is 0 based and numQuestions is not. If index is less than the total number of
    //questions render a next button to the UI. Otherwise we want the FinishScreen if we are
    //on the last question.
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
    //This button shouldn't dispatch an action type nextQuestion which increments the index bc
    //we are finished with the quiz. But rather an event that I'll call 'finish'.
  }
}

export default NextButton;
