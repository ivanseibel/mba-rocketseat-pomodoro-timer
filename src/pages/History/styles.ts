import styled from "styled-components";

export const HistoryContainer = styled.main`
  /* Layout */
  display: flex;
  flex: 1;
  padding: 3.5rem;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme["gray-100"]};
  }
`;

export const HistoryList = styled.div`
  /* Layout */
  display: flex;
  overflow: auto;
  margin-top: 2rem;

  & table {
    /* Layout */
    width: 100%;
    min-width: 600px;
    
    /* Styles */
    border-collapse: collapse;

    th {
      /* Layout */
      padding: 1rem;
      text-align: left;

      /* Styles */
      background-color: ${({ theme }) => theme["gray-600"]};
      font-weight: bold;
      color: ${({ theme }) => theme["gray-100"]};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      /* Layout */
      padding: 1rem;
      
      /* Styles */
      background-color: ${({ theme }) => theme["gray-700"]};
      border-top: 4px solid ${({ theme }) => theme["gray-800"]};
      font-size: 0.875rem;
      line-height: 1.6;
      
      &:first-child {
        width: 50%;
        border-bottom-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-bottom-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }
  }
`;

interface StatusBadgeProps {
  $statusColor: "yellow" | "red" | "green";
}

export const StatusBadge = styled.span<StatusBadgeProps>`
  /* Layout */
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    /* Layout */
    content: "";
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    
    /* Styles */
    border-radius: 50%;
    background-color: ${({ $statusColor, theme }) => theme[`${$statusColor}-500`]};
  }
`;
