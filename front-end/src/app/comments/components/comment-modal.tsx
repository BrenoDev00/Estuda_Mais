"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ModalBackground,
  Button,
  Textarea,
  FormFieldErrorMessage,
  SuccessModal,
  ErrorModal,
} from "@/components";
import { CommentSchemaType } from "@/types/schemas";
import Loading from "@/app/loading";
import { twMerge } from "tailwind-merge";
import { CommentModalProps } from "@/types/components";
import { useDeleteComment, useUpdateTask } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/schemas";

export const CommentModal = ({
  modalMode,
  isOpen,
  commentValues,
  onClose,
  closeModalAfterSubmission,
  refetch,
}: CommentModalProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
  });

  const { deleteCommentMutation } = useDeleteComment();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setValue("comment", commentValues?.comment as string);
  }, [setValue, commentValues?.comment]);

  // const { deleteTaskMutation } = useDeleteTask();

  const { updateTaskMutation } = useUpdateTask();

  function handleFormSubmit(formValues: CommentSchemaType): void {
    if (modalMode == "deleteComment") {
      deleteCommentMutation.mutate(commentValues?.id as string);
      closeModalAfterSubmission();
    }

    // const data: UpdateTaskInterface = {
    //   id: taskValues?.id as string,
    //   task: formValues?.task as string,
    //   isPublic: formValues?.isPublic as boolean,
    // };
    // if (modalMode == "updateTask") updateTaskMutation.mutate(data);
  }

  useEffect(() => {
    if (deleteCommentMutation.isSuccess || updateTaskMutation.isSuccess) {
      setIsSuccessModalOpen(true);

      refetch();
    }

    if (deleteCommentMutation.isError || updateTaskMutation.isError)
      setIsErrorModalOpen(true);
  }, [
    refetch,
    deleteCommentMutation.isSuccess,
    deleteCommentMutation.isError,
    updateTaskMutation.isSuccess,
    updateTaskMutation.isError,
  ]);

  if (deleteCommentMutation.isPending || updateTaskMutation.isPending)
    return <Loading />;

  return (
    <>
      <SuccessModal
        message="Ação realizada com sucesso!"
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      <ErrorModal
        message="Não foi possível realizar a ação. Tente novamente."
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />

      <ModalBackground isOpen={isOpen}>
        <article
          className={twMerge(
            "bg-black px-[50px] py-[30px] rounded-[8px]",
            "max-sm:px-[30px] max-sm:py-[20px]"
          )}
        >
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-[16px]"
          >
            <div className="flex flex-col gap-[13px]">
              <label
                htmlFor="task-field"
                className={twMerge(
                  "text-white text-[18px] font-semibold",
                  "max-md:text-[14px] max-sm:text-[12px]"
                )}
              >
                {modalMode == "deleteComment"
                  ? "Excluir comentário"
                  : "Editar comentário"}
              </label>

              <Textarea
                id={"task-field"}
                rows={5}
                cols={35}
                placeholder="Digite sua tarefa..."
                className={twMerge(
                  "resize-none",
                  modalMode == "deleteComment" && "cursor-not-allowed"
                )}
                disabled={modalMode == "deleteComment"}
                register={register("comment")}
              />
              {errors.comment && (
                <FormFieldErrorMessage
                  message={errors.comment.message as string}
                />
              )}
            </div>

            <div
              className={twMerge(
                "flex gap-4 flex-wrap mt-2",
                "max-sm:flex-col max-sm:flex-col-reverse"
              )}
            >
              <Button
                onClick={() => {
                  onClose();

                  setValue("comment", commentValues?.comment as string);
                }}
                type="button"
                variant="secondary"
                className={twMerge(
                  "grow bg-white text-bg-blue",
                  "border border-bg-blue border-[2px] hover:text-white"
                )}
              >
                Cancelar
              </Button>

              <Button type="submit" variant="secondary" className="grow">
                {modalMode == "deleteComment" ? "Excluir" : "Editar"} comentário
              </Button>
            </div>
          </form>
        </article>
      </ModalBackground>
    </>
  );
};
