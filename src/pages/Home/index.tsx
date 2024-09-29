import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { Play } from "phosphor-react";
import { useEffect, useState } from "react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Task name is required"),
  minutesAmount: zod
    .number()
    .min(5, "Minimum amount of minutes is 5")
    .max(60, "Maximum amount of minutes is 60"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

type Task = {
  id: string;
  name: string;
  minutesAmount: number;
  startedAt: Date;
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

    reset();
  }

  const activeTask = tasks.find((task) => task.id === activeTaskId);

  useEffect(() => {
    if (activeTask) {
      const intervalId = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeTask.startedAt),
        );
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [activeTask]);

  const task = watch("task");
  const isSubmitDisabled = !task;

  const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0;
  const remainingSeconds = activeTask ? totalSeconds - amountSecondsPassed : 0;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const minutesString = String(minutes).padStart(2, "0");
  const secondsString = String(seconds).padStart(2, "0");

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
            min={5}
            max={60}
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

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
