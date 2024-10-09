import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { TaskContext } from "../../../../contexts/TasksContext";
import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
  const {
    activeTask,
    activeTaskId,
    updateAmountSecondsPassed,
    finishActiveTask: setActiveTaskAsFinished,
    minutesString,
    secondsString,
  } = useContext(TaskContext);

  useEffect(() => {
    let intervalId: number;

    if (activeTask) {
      intervalId = setInterval(() => {
        const diffInSeconds = differenceInSeconds(
          new Date(),
          activeTask.startedAt,
        );

        if (diffInSeconds >= activeTask.minutesAmount * 60) {
          setActiveTaskAsFinished();
          clearInterval(intervalId);
        } else {
          updateAmountSecondsPassed(diffInSeconds);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [activeTask, activeTaskId, setActiveTaskAsFinished]);

  return (
    <CountdownContainer>
      <span>{minutesString[0]}</span>
      <span>{minutesString[1]}</span>
      <Separator>:</Separator>
      <span>{secondsString[0]}</span>
      <span>{secondsString[1]}</span>
    </CountdownContainer>
  );
}
