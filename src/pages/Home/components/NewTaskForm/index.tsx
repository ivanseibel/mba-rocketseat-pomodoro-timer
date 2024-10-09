import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { TaskContext } from "../../../../contexts/TasksContext";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewTaskForm() {
  const { activeTask } = useContext(TaskContext);
  const { register } = useFormContext();

  return (
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
        // step={5}
        disabled={!!activeTask}
        {...register("minutesAmount", {
          valueAsNumber: true,
        })}
      />

      <span>minutes</span>
    </FormContainer>
  );
}
