//this component will render the button element if there has been an answer. So the NextButton
//instance in App JSX needs access to the answer state.
function NextButton({ dispatch, answer }) {
  if (answer === null) return null; //if no answer return nothing. Otherwise create a button
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

export default NextButton;
