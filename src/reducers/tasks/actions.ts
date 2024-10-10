import { Task } from "../../contexts/TasksContext";

export enum ActionTypes {
  ADD_TASK = "ADD_TASK",
  STOP_TASK = "STOP_TASK",
  FINISH_TASK = "FINISH_TASK",
  UPDATE_AMOUNT_SECONDS_PASSED = "UPDATE_AMOUNT_SECONDS_PASSED",
}

export function addNewTaskAction(newTask: Task) {
  return {
    type: ActionTypes.ADD_TASK,
    payload: {
      task: newTask,
    },
  };
}

export function updateAmountSecondsPassedAction(
  newAmountSecondsPassed: number,
) {
  return {
    type: ActionTypes.UPDATE_AMOUNT_SECONDS_PASSED,
    payload: {
      newAmountSecondsPassed,
    },
  };
}

export function finishActiveTaskAction() {
  return {
    type: ActionTypes.FINISH_TASK,
  };
}

export function stopActiveTaskAction() {
  return {
    type: ActionTypes.STOP_TASK,
  };
}
