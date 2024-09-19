import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "success" | "danger";

type ButtonContainerProps = {
  variant: ButtonVariant;
};

const buttonVariants = {
  primary: {
    color: "white",
    backgroundColor: "blue",
  },
  secondary: {
    color: "white",
    backgroundColor: "gray",
  },
  success: {
    color: "white",
    backgroundColor: "green",
  },
  danger: {
    color: "white",
    backgroundColor: "red",
  },
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  ${({ variant }) => css`
    color: ${buttonVariants[variant].color};
    background-color: ${buttonVariants[variant].backgroundColor};
  `}
`;
