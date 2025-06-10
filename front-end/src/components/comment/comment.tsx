"use client";

import { CommentProps } from "@/types/components";
import { CommentContainer } from "./comment-container";
import { twMerge } from "tailwind-merge";
import { FiTrash } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

export function Comment({ text }: CommentProps) {
  return (
    <CommentContainer className="flex flex-col gap-[11px]">
      <div className="flex items-center gap-[15px]">
        <span
          className={twMerge(
            "bg-light-gray py-[5px] px-[11px] rounded-[4px]",
            "text-bg-black text-[12px]",
            "max-sm:text-[10px]"
          )}
        >
          Lucas Silva
        </span>

        <FiTrash
          className={twMerge(
            "stroke-red w-[20px] h-[20px] cursor-pointer",
            "max-sm:h-[18px] max-sm:w-[18px]"
          )}
        />

        <FaRegEdit
          className={twMerge(
            "fill-bg-blue w-[20px] h-[20px] cursor-pointer",
            "max-sm:h-[18px] max-sm:w-[18px]"
          )}
        />
      </div>

      <div>
        <p
          className={twMerge(
            "break-all",
            "max-md:text-[14px] max-sm:text-[12px]"
          )}
        >
          {text}
        </p>
      </div>
    </CommentContainer>
  );
}
