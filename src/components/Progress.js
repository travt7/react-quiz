function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  //index determines which question appears in UI. numQuestions is questions.length the total
  //number of questions. Value attribute makes this input element a controlled element.

  //Number(answer !== null) if there is an answer, the condition is T and this evaluates to 1
  //index determines the current question that appears in UI. So if there IS an answer then
  //this progress bar increments by one, whether it's correct or incorrect.
  //Number(answer !== null) if there is NO answer, the condition is F and this evaluates to 0
  //Number converts the boolean into a 1 or 0
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
