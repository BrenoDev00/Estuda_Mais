import { twMerge } from "tailwind-merge";
import { ModalBackgroundProps } from "@/types/components";

export const ModalBackground = ({
  isOpen,
  children,
  className,
}: ModalBackgroundProps) => {
  return (
    <dialog
      open={isOpen}
      className={twMerge(
        isOpen
          ? "opacity-100 pointer-events-auto flex duration-300"
          : "opacity-0 pointer-events-none duration-100",
        "flex z-10 bg-transparent backdrop-blur-md h-screen w-screen",
        "fixed top-0 bottom-0 left-0 right-0",
        "justify-center items-center transition-opacity",
        className
      )}
    >
      {children}
    </dialog>
  );
};
