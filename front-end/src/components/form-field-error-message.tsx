import { FormFieldErrorMessageProps } from "@/types/components";

export const FormFieldErrorMessage = ({
  message,
}: FormFieldErrorMessageProps) => {
  return (
    <p className="text-red text-[16px] max-md:text-[14px] max-sm:text-[12px]">
      {message}
    </p>
  );
};
