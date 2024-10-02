import * as zod from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Countdown } from "./components/Countdown";
import { NewTaskForm } from "./components/NewTaskForm";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

type Task = {
  id: string;
  name: string;
  minutesAmount: number;
  startedAt: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
};

export const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Task name is required"),
  minutesAmount: zod
    .number()
    .min(1, "Minimum amount of minutes is 5")
    .max(60, "Maximum amount of minutes is 60"),
});

type TaksContextData = {
  activeTask: Task | undefined;
  activeTaskId: string | null;
  amountSecondsPassed: number;
  minutesString: string;
  secondsString: string;
  updateAmountSecondsPassed: (newAmountSecondsPassed: number) => void;
  setActiveTaskAsFinished: () => void;
};

export const TaskContext = createContext<TaksContextData>(
  {} as TaksContextData,
);

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const newTaskForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 25,
    },
  });

  const { handleSubmit, reset, watch } = newTaskForm;

  function handleNewCycle(data: NewCycleFormData) {
    const newTask: Task = {
      id: new Date().getTime().toString(),
      name: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setActiveTaskId(newTask.id);
    setAmountSecondsPassed(0);

    reset();
  }

  const activeTask = tasks.find((task) => task.id === activeTaskId);

  const task = watch("task");
  const isSubmitDisabled = !task;

  function handleStopCountdown() {
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

  function setActiveTaskAsFinished() {
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
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)}>
        <TaskContext.Provider
          value={{
            activeTask,
            activeTaskId,
            amountSecondsPassed,
            minutesString,
            secondsString,
            updateAmountSecondsPassed,
            setActiveTaskAsFinished,
          }}
        >
          <FormProvider {...newTaskForm}>
            <NewTaskForm />
          </FormProvider>
          <Countdown />
        </TaskContext.Provider>

        {activeTask ? (
          <StopCountdownButton type="button" onClick={handleStopCountdown}>
            <HandPalm size={24} />
            Interrupt
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
