import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "success" | "danger";

type ButtonContainerProps = {
  variant: ButtonVariant;
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  border-radius: 4px;
  border: none;
  margin: 8px;
  background-color: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme["white"]};
`;
