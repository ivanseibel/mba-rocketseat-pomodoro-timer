import { useContext } from "react";
import { TaskContext } from "../../contexts/TasksContext";
import { HistoryContainer, HistoryList, StatusBadge } from "./styles";

export function History() {
  const { tasks } = useContext(TaskContext);

  const getStatusAndColor = (task) => {
    if (task.finishedAt) {
      return { status: "Completed", color: "green" };
    } else if (task.stoppedAt) {
      return { status: "Stopped", color: "red" };
    } else {
      return { status: "In Progress", color: "yellow" };
    }
  };

  return (
    <HistoryContainer>
      <h1>My history</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Started at</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.minutesAmount} minutes</td>
                  <td>{task.startedAt.toLocaleString()}</td>
                  <td>
                    {task.finishedAt && (
                      <StatusBadge $statusColor="green">Finished</StatusBadge>
                    )}
                    {task.stoppedAt && (
                      <StatusBadge $statusColor="red">Stopped</StatusBadge>
                    )}
                    {!task.finishedAt && !task.stoppedAt && (
                      <StatusBadge $statusColor="yellow">
                        In Progress
                      </StatusBadge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
