//if the index equals the answer then add the answer class. Otherwise don't add anything. if
//the index equals the correctOption property then add correct class. Otherwise wrong class.
//When we do conditional CSS we should always use the ternary operator.

//So initially we pass the object at index[0] in the questions array through the question prop
//to the Options property called question.
function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  //We need to find out if payload:index has been dispatched to change the answer state. The
  //only way that happens is if the user clicks on one of the buttons. Boolean either T or F.

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            //there can be an index with no answer resulting in no answer class being applied.
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : "" //the index variable is not our state index yet. When onClick dispatches the
            //action with the index as the payload data that becomes the answer state because
            //of the reducer function. It only lives inside map. we
            //only want 'correct' and 'wrong' classes to apply if
            //there is an answer to compare to the object's correctOption property. If there was
            //no index data dispatched by onClick attribute which becomes the answer state then answer
            //is null resulting in ternary operator giving an empty string meaning correct and
            //wrong classes are not applied. So in this situation: answer !== null. Need to reuse
            //this logic so save to a variable. **If user doesn't click on A BUTTON there will be no
            //answer state, null. Meaning hasAnswered variable is null.
          }`}
          key={option}
          disabled={hasAnswered}
          //Until user clicks on button causing onClick attribute to dispatch the index the
          //initial state of the answer is null. The value of index is dispatched on the payload
          //which updates the answer property on the state object which happens in the reducer.
          //So check if the answer is NOT NULL meaning the
          //answer variable(state property) has a value and I want to disable the buttons
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: index, //payload of action object is the index variable that our map function
              //gives us. There are 4 elements/indices in the options array property on the
              //question object.So the answer state changes to index 2 if I click on Svelte.
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}
//Now user will click on an option(answer). 3 things happen when user clicks on an option.
//1st: The correct and the wrong answers are displayed.
//2nd: The points are updated.
//3rd: The next button is displayed
//So when user clicks on one of the options, the screen needs to change/rerender. That means
//we need a new piece of state. This state should store the option that was selected. Was the
//answer the 0123 element?
//The first arg of the map method is the current element of array and 2nd arg is the index of it. The
//answer is basically the index of the option in the options array property on the question
//object.

//The reason the Options component received the answer prop is so I can do some formatting by
//conditionally changing the className based on the answer state.

export default Options;
