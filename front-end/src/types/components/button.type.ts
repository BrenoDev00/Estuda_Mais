import { ReactNode } from "react";

type ButtonAttributeType = "button" | "submit" | "reset";

type ButtonVariantType = "primary" | "secondary";

export interface ButtonProps {
  variant: ButtonVariantType;
  type: ButtonAttributeType;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}
