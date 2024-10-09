import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TaskContext } from "../../contexts/TasksContext";
import {
  NewTaskFormData,
  newCycleFormValidationSchema,
} from "../../schemas/newTask";
import { Countdown } from "./components/Countdown";
import { NewTaskForm } from "./components/NewTaskForm";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

export function Home() {
  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 25,
    },
  });

  const { activeTask, stopCountdown, startNewTask } = useContext(TaskContext);

  const { handleSubmit, reset, watch } = newTaskForm;

  function handleNewTask(data: NewTaskFormData) {
    startNewTask(data);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewTask)}>
        <FormProvider {...newTaskForm}>
          <NewTaskForm />
        </FormProvider>
        <Countdown />

        {activeTask ? (
          <StopCountdownButton type="button" onClick={stopCountdown}>
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
