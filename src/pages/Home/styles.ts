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
