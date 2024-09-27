import { HistoryContainer, HistoryList, StatusBadge } from "./styles";

export function History() {
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
            <tr>
              <td>Task 1</td>
              <td>25 minutes</td>
              <td>2 days ago</td>
              <td>
                <StatusBadge $statusColor="red">Stopped</StatusBadge>
              </td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td>50 minutes</td>
              <td>1 week ago</td>
              <td>
                <StatusBadge $statusColor="green">Completed</StatusBadge>
              </td>
            </tr>
            <tr>
              <td>Task 3</td>
              <td>30 minutes</td>
              <td>10 minutes ago</td>
              <td>
                <StatusBadge $statusColor="yellow">In Progress</StatusBadge>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>25 minutes</td>
              <td>2 days ago</td>
              <td>
                <StatusBadge $statusColor="red">Stopped</StatusBadge>
              </td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td>50 minutes</td>
              <td>1 week ago</td>
              <td>
                <StatusBadge $statusColor="green">Completed</StatusBadge>
              </td>
            </tr>
            <tr>
              <td>Task 3</td>
              <td>30 minutes</td>
              <td>10 minutes ago</td>
              <td>
                <StatusBadge $statusColor="yellow">In Progress</StatusBadge>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
