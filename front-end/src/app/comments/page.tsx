"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Header,
  Textarea,
  Button,
  Comment,
  ErrorModal,
  FormFieldErrorMessage,
} from "@/components";
import Loading from "../loading";
import { useGetComments } from "@/hooks";
import { useSearchParams, redirect } from "next/navigation";
import { ListCommentsInterface } from "@/types/comment/comment.type";
import { useSession } from "next-auth/react";
import { commentSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCommentType } from "@/types/schemas";

export default function CommentsPage() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") redirect("/");
  }, [status]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCommentType>({
    resolver: zodResolver(commentSchema),
  });

  const { comments, commentListError, commentListLoading, refetch } =
    useGetComments();

  const searchParams = useSearchParams();
  const currentTaskId = searchParams.get("taskId") as string;

  const currentTask = comments?.find(
    (comment) => comment?.task?.id === currentTaskId
  ) as ListCommentsInterface;

  const commentsByTask = comments?.filter(
    (comment) =>
      comment?.task?.id === currentTaskId && comment?.comment !== null
  ) as ListCommentsInterface[];

  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(true);

  useEffect(() => {
    refetch();
  }, [refetch]);

  async function handleFormSubmit(values: NewCommentType) {
    alert(values.comment);
  }

  if (commentListError)
    return (
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message="Não foi possível carregar os comentários. Tente novamente."
      />
    );

  if (commentListLoading) return <Loading />;

  return (
    <>
      <Header />
      <main className="flex flex-col items-center my-[80px]">
        <section
          className={twMerge(
            "px-[128px] w-[1024px] max-md:w-[800px] max-sm:w-[600px]",
            "flex justify-center"
          )}
        >
          <Textarea
            id={"task-field"}
            rows={5}
            cols={8}
            className={twMerge(
              "w-full resize-none",
              "border border border-solid border-dark-gray"
            )}
            disabled={true}
            value={currentTask?.task?.task}
          />
        </section>

        <section
          className={twMerge(
            "px-[128px] mt-[75px]",
            "w-[1024px] max-md:w-[800px] max-sm:w-[600px]"
          )}
        >
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col gap-[13px]">
              <h1
                className={twMerge(
                  "font-bold text-[20px]",
                  "max-md:text-[16px] max-sm:text-[14px]"
                )}
              >
                Deixar comentário
              </h1>

              <Textarea
                id="comment-field"
                rows={2}
                cols={8}
                placeholder="Digite seu comentário"
                className={twMerge(
                  "w-full resize-none",
                  "border border border-solid border-dark-gray"
                )}
                register={register("comment")}
              />
              {errors.comment && (
                <FormFieldErrorMessage message={errors.comment.message!} />
              )}
            </div>

            <Button
              type="submit"
              variant="secondary"
              className="mt-[15px] w-full"
            >
              Enviar comentário
            </Button>
          </form>
        </section>

        {commentsByTask?.length > 0 && (
          <section
            className={twMerge(
              "px-[128px] mt-[57px]",
              "w-[1024px] max-md:w-[800px] max-sm:w-[600px]",
              "flex flex-col gap-[14px]"
            )}
          >
            <h2
              className={twMerge(
                "font-bold text-[20px]",
                "max-md:text-[16px] max-sm:text-[14px]"
              )}
            >
              Todos comentários
            </h2>

            <div className="flex flex-col gap-[14px]">
              {commentsByTask?.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
