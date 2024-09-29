import styled from "styled-components";

export const HomeContainer = styled.main`
  /* Layout */
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    /* Layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseCountdownButton = styled.button`
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  gap: 0.5rem;
  
  /* Styles */
  border: 0;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${({ theme }) => theme["gray-100"]};

  &:disabled {
    /* Styles */
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  /* Styles */
  background-color: ${({ theme }) => theme["green-500"]};

  &:not(:disabled):hover {
    /* Styles */
    background-color: ${({ theme }) => theme["green-700"]};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  /* Styles */
  background-color: ${({ theme }) => theme["red-500"]};

  &:not(:disabled):hover {
    /* Styles */
    background-color: ${({ theme }) => theme["red-700"]};
  }
`;
