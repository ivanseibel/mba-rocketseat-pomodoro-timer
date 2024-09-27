import { HistoryContainer, HistoryList } from "./styles";

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
              <td>Stopped</td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td>50 minutes</td>
              <td>1 week ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task 3</td>
              <td>30 minutes</td>
              <td>10 minutes ago</td>
              <td>In progress</td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>25 minutes</td>
              <td>2 days ago</td>
              <td>Stopped</td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td>50 minutes</td>
              <td>1 week ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task 3</td>
              <td>30 minutes</td>
              <td>10 minutes ago</td>
              <td>In progress</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
