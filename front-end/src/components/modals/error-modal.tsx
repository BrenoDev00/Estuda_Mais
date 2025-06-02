import { twMerge } from "tailwind-merge";
import { ModalBackground } from "./modal-background";
import { VscError } from "react-icons/vsc";
import { ErrorModalProps } from "@/types/components/modals";
import { Button } from "../button";

export const ErrorModal = ({ message, isOpen, onClose }: ErrorModalProps) => {
  return (
    <ModalBackground isOpen={isOpen}>
      <article
        className={twMerge(
          "bg-black rounded-[8px] px-4 py-6 basis-[350px]",
          "flex flex-col items-center gap-4",
          "max-md:px-2 max-md:py-4 max-md:basis-[250px]"
        )}
      >
        <div>
          <VscError
            className={twMerge(
              "fill-red w-[60px] h-[60px]",
              "max-md:w-[40px] max-md:h-[40px]"
            )}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p
            className={twMerge(
              "text-white text-[18px] text-center",
              "max-md:text-[16px] max-sm:text-[14px]"
            )}
          >
            {message}
          </p>

          <Button
            variant="primary"
            type="button"
            className={twMerge(
              "bg-white text-black",
              "max-md:text-[14px] max-sm:text-[12px]"
            )}
            onClick={onClose}
          >
            Fechar
          </Button>
        </div>
      </article>
    </ModalBackground>
  );
};
