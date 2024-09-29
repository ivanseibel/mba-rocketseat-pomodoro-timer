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

export const FormContainer = styled.div`
  /* Layout */
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  /* Styles */
  color: ${({ theme }) => theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
`;

export const CountdownContainer = styled.div`
  /* Layout */
  display: flex;
  gap: 1rem;

  /* Styles */
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme["green-100"]};

  span {
    /* Layout */
    padding: 2rem 1rem;
    border-radius: 8px;

    /* Styles */
    background-color: ${({ theme }) => theme["gray-700"]};
  }
`;

export const Separator = styled.span`
  /* Layout */
  display: flex;
  padding: 2rem 0;
  width: 4rem;
  justify-content: center;
  
  /* Styles */
  color: ${({ theme }) => theme["green-500"]};
  overflow: hidden;
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

const BaseInput = styled.input`
  /* Layout */
  height: 2.5rem;
  padding: 0 0.5rem;

  /* Styles */
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme["gray-500"]};
  font-weight: bold;
  font-size: 1.125rem;
  color: ${({ theme }) => theme["gray-100"]};

  &:focus {
    /* Styles */
    box-shadow: none;
    border-color: ${({ theme }) => theme["green-500"]};
  }

  &::placeholder {
    /* Styles */
    color: ${({ theme }) => theme["gray-500"]};
  }
`;

export const TaskInput = styled(BaseInput)`
  /* Layout */
  flex: 1;

  /* Styles */

  &::-webkit-calendar-picker-indicator {
    /* Styles */
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  /* Layout */
  width: 4rem;
  
`;
