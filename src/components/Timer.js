import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  //useEffect hook to create a side effect on mount. So as this Timer component
  //mounts when status state is set to 'active' the Timer is initialized. So we can't start the
  //Timer in the App component bc then the Timer will start running as soon as the entire
  //application mounts. So we have to place this effect into one of the components that mounts
  //as the quiz starts.

  //separate the minutes from the seconds is better formatting.
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
        //console.log("tick");we want some state value that we can decrease every 1 second.
        //Must have a cleanup function, otherwise the timer will keep running after the Timer
        //component has unmounted. Store the id of the timer that gets returned from the
        //setInterval method so I can use it in the cleanup func. Every setInterval will return
        //a unique id.
      }, 1000);

      return () => clearInterval(id); //this will run between renders and more importantly after
      //this component has unmounted.
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
//setInterval will run the func we pass into it every couple of ms.
export default Timer;
