"use client";

import { ButtonProps } from "@/types/components";
import { twMerge } from "tailwind-merge";

export const Button = ({
  variant,
  className,
  type,
  children,
  onClick,
}: ButtonProps) => {
  let buttonStyle: string;

  if (variant === "primary") {
    buttonStyle = twMerge(
      "bg-bg-black rounded-full py-[8px] px-[30px]",
      "border border-white cursor-pointer text-white",
      "hover:bg-white hover:text-bg-black transition duration-300",
      "max-md:text-[14px] max-sm:text-[12px]",
      "max-md:px-[25px] max-md:py-[6px] max-sm:px-[20px]"
    );

    return (
      <button
        onClick={onClick}
        type={type}
        className={twMerge(buttonStyle, className)}
      >
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    buttonStyle = twMerge(
      "bg-bg-blue rounded-[8px] py-[8px] px-[30px] cursor-pointer text-white font-bold hover:bg-dark-blue",
      "max-md:text-[14px] max-sm:text-[12px]",
      "max-md:px-[25px] max-md:py-[6px] max-sm:px-[20px]"
    );

    return (
      <button
        onClick={onClick}
        type={type}
        className={twMerge(buttonStyle, className)}
      >
        {children}
      </button>
    );
  }
};
