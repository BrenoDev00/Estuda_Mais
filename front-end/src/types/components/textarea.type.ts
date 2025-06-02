import { UseFormRegisterReturn } from "react-hook-form";

export interface TextareaProps {
  id: string;
  rows: number;
  cols: number;
  register: UseFormRegisterReturn;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}
