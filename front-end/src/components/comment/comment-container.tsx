"use client";

import { twMerge } from "tailwind-merge";
import { CommentContainerProps } from "@/types/components";

export const CommentContainer = ({
  className,
  children,
}: CommentContainerProps) => {
  return (
    <article
      className={twMerge(
        "border border-dark-gray rounded-[8px]",
        "pt-[10px] pb-[15px] pl-[15px] pr-[20px]",
        className
      )}
    >
      {children}
    </article>
  );
};
