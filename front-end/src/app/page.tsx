"use client";

import Image from "next/image";
import heroImage from "../../public/assets/hero.png";
import { twMerge } from "tailwind-merge";
import { LabelBox, Header, ErrorModal } from "@/components";
import { useGetTotalRecords } from "@/hooks";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  const {
    totalRecords,
    totalRecordsListError,
    totalRecordsListLoading,
    refetch,
  } = useGetTotalRecords();

  const totalComments: number | undefined = totalRecords?.[0]?.comments;

  const totalTasks: number | undefined = totalRecords?.[0]?.tasks;

  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (totalRecordsListError) setIsErrorModalOpen(true);

    refetch();
  }, [refetch, totalRecordsListError]);

  if (totalRecordsListLoading) return <Loading />;

  return (
    <>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message="Não foi possível listar o total de posts e comentários. Tente novamente."
      />

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
          {(totalComments as number) > 2 && (totalTasks as number) > 2 && (
            <>
              <LabelBox className="hover:scale-110 transition duration-300">
                + de {(totalTasks as number) - 1} posts
              </LabelBox>

              <LabelBox className="hover:scale-110 transition duration-300">
                + de {(totalComments as number) - 1} comentários
              </LabelBox>
            </>
          )}
        </div>
      </main>
    </>
  );
}
