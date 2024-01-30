//if the index equals the answer then add the answer class. Otherwise don't add anything. if
//the index equals the correctOption property then add correct class. Otherwise wrong class.
//When we do conditional CSS we should always use the ternary operator.
function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            index === question.correctOption ? "correct" : "wrong"
          }`}
          key={option}
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: index, //payload of action object is the index of one of the 4 options so
              //the answer state changes to index 2 if I click on Svelte
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
