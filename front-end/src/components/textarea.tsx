import { TextareaProps } from "@/types/components";
import { twMerge } from "tailwind-merge";

export const Textarea = ({
  id,
  rows,
  cols,
  className,
  placeholder,
  register,
  disabled,
  value,
}: TextareaProps) => {
  return (
    <textarea
      id={id}
      className={twMerge(
        "bg-white rounded-[8px] text-bg-black",
        "py-[20px] px-[14px] outline-none",
        className
      )}
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      {...register}
    ></textarea>
  );
};
