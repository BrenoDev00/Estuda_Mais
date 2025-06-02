import { ReactNode } from "react";

export interface ModalBackgroundProps {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}
