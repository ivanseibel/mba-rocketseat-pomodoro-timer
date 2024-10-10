import { createContext, useEffect, useReducer, useState } from "react";
import { tasksReducer } from "../reducers/tasks";
import { NewTaskFormData } from "../schemas/newTask";

export type Task = {
  id: string;
  name: string;
  minutesAmount: number;
  startedAt: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
};

type TaksContextData = {
  tasks: Task[];
  activeTask: Task | undefined;
  activeTaskId: string | null;
  amountSecondsPassed: number;
  minutesString: string;
  secondsString: string;
  stopCountdown: () => void;
  updateAmountSecondsPassed: (newAmountSecondsPassed: number) => void;
  finishActiveTask: () => void;
  startNewTask: (data: NewTaskFormData) => void;
};

export const TaskContext = createContext<TaksContextData>(
  {} as TaksContextData,
);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [taskState, dispatch] = useReducer(tasksReducer, {
    tasks: [],
    activeTaskId: null,
    amountSecondsPassed: 0,
  });

  function stopCountdown() {
    dispatch({
      type: "STOP_TASK",
      payload: {
        id: taskState.activeTaskId,
      },
    });
  }

  function finishActiveTask() {
    dispatch({
      type: "FINISH_TASK",
      payload: {
        id: taskState.activeTaskId,
      },
    });
  }

  function updateAmountSecondsPassed(newAmountSecondsPassed: number) {
    dispatch({
      type: "UPDATE_AMOUNT_SECONDS_PASSED",
      payload: {
        newAmountSecondsPassed,
      },
    });
  }

  function startNewTask(data: NewTaskFormData) {
    const newTask: Task = {
      id: new Date().getTime().toString(),
      name: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    };

    dispatch({
      type: "ADD_TASK",
      payload: {
        task: newTask,
      },
    });
  }

  const activeTask = taskState.tasks.find(
    (task) => task.id === taskState.activeTaskId,
  );

  const totalSeconds = !!activeTask ? activeTask.minutesAmount * 60 : 0;

  const remainingSeconds = !!activeTask
    ? totalSeconds - taskState.amountSecondsPassed
    : 0;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const minutesString = String(minutes).padStart(2, "0");
  const secondsString = String(seconds).padStart(2, "0");

  useEffect(() => {
    if (activeTask) {
      document.title = `${minutesString}:${secondsString}`;
      return;
    }

    document.title = "Pomodoro";
  }, [minutes, seconds, activeTask]);

  return (
    <TaskContext.Provider
      value={{
        tasks: taskState.tasks,
        activeTask,
        activeTaskId: taskState.activeTaskId,
        amountSecondsPassed: taskState.amountSecondsPassed,
        minutesString,
        secondsString,
        updateAmountSecondsPassed,
        finishActiveTask,
        stopCountdown,
        startNewTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
