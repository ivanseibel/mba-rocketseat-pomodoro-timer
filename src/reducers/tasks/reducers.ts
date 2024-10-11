import { produce } from "immer";

import { Task } from "../../contexts/TasksContext";
import { ActionTypes } from "./actions";

type TasksState = {
  tasks: Task[];
  activeTaskId: string | null;
  amountSecondsPassed: number;
};

export function tasksReducer(state: TasksState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      return produce(state, (draft) => {
        draft.tasks.push(action.payload.task);
        draft.activeTaskId = action.payload.task.id;
        draft.amountSecondsPassed = 0;
      });
    case ActionTypes.STOP_TASK: {
      const currentTaskIndex = state.tasks.findIndex(
        (task) => task.id === state.activeTaskId,
      );

      if (currentTaskIndex === -1) {
        return state;
      }

      return produce(state, (draft) => {
        draft.tasks[currentTaskIndex].stoppedAt = new Date();
        draft.activeTaskId = null;
        draft.amountSecondsPassed = 0;
      });
    }

    case ActionTypes.FINISH_TASK: {
      const currentTaskIndex = state.tasks.findIndex(
        (task) => task.id === state.activeTaskId,
      );

      if (currentTaskIndex === -1) {
        return state;
      }

      return produce(state, (draft) => {
        draft.tasks[currentTaskIndex].finishedAt = new Date();
        draft.activeTaskId = null;
        draft.amountSecondsPassed = 0;
      });
    }
    case ActionTypes.UPDATE_AMOUNT_SECONDS_PASSED:
      return {
        ...state,
        amountSecondsPassed: action.payload.newAmountSecondsPassed,
      };
    default:
      return state;
  }
}
