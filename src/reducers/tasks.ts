import { Task } from "../contexts/TasksContext";

type TasksState = {
  tasks: Task[];
  activeTaskId: string | null;
  amountSecondsPassed: number;
};

export enum ActionTypes {
  ADD_TASK = "ADD_TASK",
  STOP_TASK = "STOP_TASK",
  FINISH_TASK = "FINISH_TASK",
  UPDATE_AMOUNT_SECONDS_PASSED = "UPDATE_AMOUNT_SECONDS_PASSED",
}

export function tasksReducer(state: TasksState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
        activeTaskId: action.payload.task.id,
        amountSecondsPassed: 0,
      };
    case ActionTypes.STOP_TASK:
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
    case ActionTypes.FINISH_TASK:
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
    case ActionTypes.UPDATE_AMOUNT_SECONDS_PASSED:
      return {
        ...state,
        amountSecondsPassed: action.payload.newAmountSecondsPassed,
      };
    default:
      return state;
  }
}
