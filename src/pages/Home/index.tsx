import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Task name is required"),
  minutesAmount: zod
    .number()
    .min(1, "Minimum amount of minutes is 5")
    .max(60, "Maximum amount of minutes is 60"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

type Task = {
  id: string;
  name: string;
  minutesAmount: number;
  startedAt: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 25,
    },
  });

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

  useEffect(() => {
    let intervalId: number;

    if (activeTask) {
      intervalId = setInterval(() => {
        const diffInSeconds = differenceInSeconds(
          new Date(),
          activeTask.startedAt,
        );

        if (diffInSeconds >= activeTask.minutesAmount * 60) {
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
          clearInterval(intervalId);
        } else {
          setAmountSecondsPassed(diffInSeconds);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [activeTask, activeTaskId]);

  const task = watch("task");
  const isSubmitDisabled = !task;

  const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0;
  const remainingSeconds = activeTask ? totalSeconds - amountSecondsPassed : 0;

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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I'm going to work on</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name to your project"
            list="tasks"
            disabled={!!activeTask}
            {...register("task")}
          />

          <datalist id="tasks">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={!!activeTask}
            {...register("minutesAmount", {
              valueAsNumber: true,
            })}
          />

          <span>minutes</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutesString[0]}</span>
          <span>{minutesString[1]}</span>
          <Separator>:</Separator>
          <span>{secondsString[0]}</span>
          <span>{secondsString[1]}</span>
        </CountdownContainer>

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
