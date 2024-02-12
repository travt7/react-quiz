//console.log to take a look at the shape of the question object in the questions array. I see
//the question object has a question property. I want that property to be displayed on the screen
//We also have an options property that is an array that contains the answers that I need to

import Options from "./Options";

//loop over and display so user can click on one. This component receives
//the first question from the questions array at index 0. questions[index] So initially we
//pass the object at index[0] in the questions array through the question prop. Refer to App.
//question, dispatch, answer:These are properties from the Question instance in APP JSX where
//each property is assigned some data.
function Question({ question, dispatch, answer }) {
  //console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
//pass the Options component instance the question object so it has
//access to the options property which is an array of 4 answer options

//for each element in the options array I want to return a button
//Whenever there is a list like this, it's nice to have a smaller component
//and split it off from here. Call it Options.
//{question.options.map((option) => (
//<button className="btn btn-option" key={option}>
//{option}
//</button>
//))}
export default Question;
