import { createContext, useEffect, useState } from "react";
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  function stopCountdown() {
    const updatedTasks = tasks.map((task) => {
      if (task.id === activeTaskId) {
        return {
          ...task,
          stoppedAt: new Date(),
        };
      }

      return task;
    });

    setTasks(updatedTasks);
    setActiveTaskId(null);
    setAmountSecondsPassed(0);
  }

  function finishActiveTask() {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === activeTaskId) {
          return {
            ...task,
            finishedAt: new Date(),
          };
        }

        return task;
      }),
    );
    setActiveTaskId(null);
    setAmountSecondsPassed(0);
  }

  function updateAmountSecondsPassed(newAmountSecondsPassed: number) {
    setAmountSecondsPassed(newAmountSecondsPassed);
  }

  function startNewTask(data: NewTaskFormData) {
    const newTask: Task = {
      id: new Date().getTime().toString(),
      name: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setActiveTaskId(newTask.id);
    setAmountSecondsPassed(0);
  }

  const activeTask = tasks.find((task) => task.id === activeTaskId);

  const totalSeconds = !!activeTask ? activeTask.minutesAmount * 60 : 0;

  const remainingSeconds = !!activeTask
    ? totalSeconds - amountSecondsPassed
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
        tasks,
        activeTask,
        activeTaskId,
        amountSecondsPassed,
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
