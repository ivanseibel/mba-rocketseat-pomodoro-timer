import { styled } from "styled-components";

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
