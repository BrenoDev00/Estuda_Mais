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
  SuccessModal,
} from "@/components";
import { CommentModal } from "./components";
import Loading from "../loading";
import { useGetComments, useCreateComment } from "@/hooks";
import { useSearchParams, redirect } from "next/navigation";
import {
  ListCommentsInterface,
  NewCommentInterface,
} from "@/types/comment/comment.type";
import { useSession } from "next-auth/react";
import { commentSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchemaType } from "@/types/schemas";

export default function CommentsPage() {
  const { status, data: session } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") redirect("/");
  }, [status]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
  });

  const { comments, commentListError, commentListLoading, refetch } =
    useGetComments();

  const { createCommentMutation } = useCreateComment();

  const searchParams = useSearchParams();
  const currentTaskId = searchParams.get("taskId") as string;

  const currentTask = comments?.find(
    (comment) => comment?.task?.id === currentTaskId
  ) as ListCommentsInterface;

  const commentsByTask = comments?.filter(
    (comment) =>
      comment?.task?.id === currentTaskId && comment?.comment !== null
  ) as ListCommentsInterface[];

  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);

  const [modalMode, setModalMode] = useState<
    "deleteComment" | "updateComment" | null
  >(null);

  const [selectedComment, setSelectedComment] = useState<Omit<
    ListCommentsInterface,
    "userEmail" | "task"
  > | null>(null);

  useEffect(() => {
    if (createCommentMutation.isSuccess) setIsSuccessModalOpen(true);

    if (commentListError || createCommentMutation.isError)
      setIsErrorModalOpen(true);

    refetch();
  }, [
    refetch,
    createCommentMutation.isSuccess,
    createCommentMutation.isError,
    commentListError,
  ]);

  function handleFormSubmit(data: CommentSchemaType): void {
    const result: NewCommentInterface = {
      ...data,
      taskId: currentTaskId,
      userName: session?.user?.name as string,
      userEmail: session?.user?.email as string,
    };

    reset();

    createCommentMutation.mutate(result);
  }

  function handleOpenCommentDeleteModal(
    comment: Omit<ListCommentsInterface, "userEmail" | "task">
  ) {
    setIsCommentModalOpen(true);

    setModalMode("deleteComment");

    setSelectedComment(comment);
  }

  function handleOpenCommentUpdateModal(
    comment: Omit<ListCommentsInterface, "userEmail" | "task">
  ) {
    setIsCommentModalOpen(true);

    setModalMode("updateComment");

    setSelectedComment(comment);
  }

  if (commentListLoading || createCommentMutation.isPending) return <Loading />;

  return (
    <>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={"Ação realizada com sucesso!"}
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={"Não foi possível realizar a ação. Tente novamente."}
      />

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        modalMode={modalMode}
        commentValues={selectedComment}
        closeModalAfterSubmission={() => setIsErrorModalOpen(false)}
        refetch={refetch}
      />

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
                return (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    handleCommentDelete={handleOpenCommentDeleteModal}
                    handleCommentUpdate={handleOpenCommentUpdateModal}
                  />
                );
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
