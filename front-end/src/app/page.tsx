"use client";

import Image from "next/image";
import heroImage from "../../public/assets/hero.png";
import { twMerge } from "tailwind-merge";
import { LabelBox, Header } from "@/components";

export default function Home() {
  return (
    <>
      <Header />

      <main
        className={twMerge(
          "bg-bg-black w-screen h-screen",
          "flex justify-center items-center flex-col p-4"
        )}
      >
        <div>
          <Image
            className={twMerge("max-w-[480px]", "max-md:max-w-[300px]")}
            alt="Logo Tarefas+."
            src={heroImage}
            priority
          />
        </div>

        <h1
          className={twMerge(
            "text-white text-[38px] text-center",
            "font-bold mt-[69px]",
            "max-md:text-[28px] max-sm:text-[22px]"
          )}
        >
          Sistema feito para você organizar <br /> seus estudos e tarefas
        </h1>

        <div
          className={twMerge(
            "flex items-center gap-[24px] mt-[58px]",
            "max-sm:flex-col"
          )}
        >
          <LabelBox className="hover:scale-110 transition duration-300">
            + 7 mil posts
          </LabelBox>

          <LabelBox className="hover:scale-110 transition duration-300">
            + 1 mil comentários
          </LabelBox>
        </div>
      </main>
    </>
  );
}
