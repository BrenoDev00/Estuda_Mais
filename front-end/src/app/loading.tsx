import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

export default function Loading() {
  return (
    <div
      className={twMerge(
        "h-screen w-screen flex items-center justify-center",
        "z-50 bg-bg-black"
      )}
    >
      <div className="flex flex-col items-center gap-2 -mt-[60px]">
        <AiOutlineLoading3Quarters className="animate-spin fill-red h-[40px] w-[40px]" />

        <p className="text-[16px] text-red font-semibold">Carregando...</p>
      </div>
    </div>
  );
}
