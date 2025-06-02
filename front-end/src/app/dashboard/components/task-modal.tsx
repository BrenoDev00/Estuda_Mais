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
import { UpdateTaskInterface } from "@/types/task/task.type";
import Loading from "@/app/loading";
import { twMerge } from "tailwind-merge";
import { TaskModalProps } from "@/types/components";
import { useDeleteTask, useUpdateTask } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/schemas";
import { TaskSchemaType } from "@/types/schemas";

export const TaskModal = ({
  modalMode,
  isOpen,
  taskValues,
  onClose,
  closeModalAfterSubmission,
  refetch,
}: TaskModalProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setValue("isPublic", taskValues?.isPublic as boolean);
    setValue("task", taskValues?.task as string);
  }, [setValue, taskValues?.isPublic, taskValues?.task]);

  const { deleteTaskMutation } = useDeleteTask();

  const { updateTaskMutation } = useUpdateTask();

  function handleFormSubmit(formValues: TaskSchemaType) {
    if (modalMode == "deleteTask")
      deleteTaskMutation.mutate(taskValues?.id as string);

    const data: UpdateTaskInterface = {
      id: taskValues?.id as string,
      task: formValues?.task as string,
      isPublic: formValues?.isPublic as boolean,
    };

    if (modalMode == "updateTask") updateTaskMutation.mutate(data);

    closeModalAfterSubmission();
  }

  useEffect(() => {
    if (deleteTaskMutation.isSuccess || updateTaskMutation.isSuccess) {
      setIsSuccessModalOpen(true);

      refetch();
    }

    if (deleteTaskMutation.isError || updateTaskMutation.isError)
      setIsErrorModalOpen(true);
  }, [
    refetch,
    deleteTaskMutation.isSuccess,
    deleteTaskMutation.isError,
    updateTaskMutation.isSuccess,
    updateTaskMutation.isError,
  ]);

  if (deleteTaskMutation.isPending || updateTaskMutation.isPending)
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
                {modalMode == "deleteTask" ? "Excluir tarefa" : "Editar tarefa"}
              </label>
              <Textarea
                id={"task-field"}
                rows={5}
                cols={35}
                placeholder="Digite sua tarefa..."
                className={twMerge(
                  "resize-none",
                  modalMode == "deleteTask" && "cursor-not-allowed"
                )}
                disabled={modalMode == "deleteTask"}
                register={register("task")}
              />
              {errors.task && (
                <FormFieldErrorMessage
                  message={errors.task.message as string}
                />
              )}
            </div>

            <div className="flex gap-[13px] items-center">
              <input
                type="checkbox"
                id="public-task"
                className={twMerge(
                  "w-[18px] h-[18px] cursor-pointer",
                  "max-md:w-[14px] max-md:h-[18px]",
                  modalMode == "deleteTask" && "cursor-not-allowed"
                )}
                disabled={modalMode == "deleteTask"}
                {...register("isPublic")}
              />

              <label
                htmlFor="public-task"
                className={twMerge(
                  "font-medium text-white",
                  "max-md:text-[14px] max-sm:text-[12px]"
                )}
              >
                Deixar tarefa pública
              </label>
            </div>

            <div
              className={twMerge(
                "flex gap-4 flex-wrap",
                "max-sm:flex-col max-sm:flex-col-reverse"
              )}
            >
              <Button
                onClick={() => {
                  onClose();

                  setValue("task", taskValues?.task as string);
                  setValue("isPublic", taskValues?.isPublic as boolean);
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
                {modalMode == "deleteTask" ? "Excluir" : "Editar"} tarefa
              </Button>
            </div>
          </form>
        </article>
      </ModalBackground>
    </>
  );
};
