import { Task } from "../contexts/TasksContext";

type TasksState = {
  tasks: Task[];
  activeTaskId: string | null;
  amountSecondsPassed: number;
};

export function tasksReducer(state: TasksState, action: any) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
        activeTaskId: action.payload.task.id,
        amountSecondsPassed: 0,
      };
    case "STOP_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              stoppedAt: new Date(),
            };
          }

          return task;
        }),
        activeTaskId: null,
        amountSecondsPassed: 0,
      };
    case "FINISH_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              finishedAt: new Date(),
            };
          }

          return task;
        }),
        activeTaskId: null,
        amountSecondsPassed: 0,
      };
    case "UPDATE_AMOUNT_SECONDS_PASSED":
      return {
        ...state,
        amountSecondsPassed: action.payload.newAmountSecondsPassed,
      };
    default:
      return state;
  }
}
