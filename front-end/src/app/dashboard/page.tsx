"use client";

import {
  Header,
  Textarea,
  Button,
  Task,
  FormFieldErrorMessage,
  SuccessModal,
  ErrorModal,
} from "@/components";
import Loading from "../loading";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import { TaskSchemaType } from "@/types/schemas";
import { taskSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask, useGetTasks } from "@/hooks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { ListTasksInterface, NewTaskInterface } from "@/types/task/task.type";
import { TaskModal } from "./components";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "unauthenticated") redirect("/");
  }, [status]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
  });

  const { createTaskMutation } = useCreateTask();

  const { tasks, taskListLoading, taskListError, refetch } = useGetTasks();

  const tasksByUserEmail = tasks?.filter(
    (task: ListTasksInterface) => task?.userEmail === session?.user?.email
  );

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);

  const [selectedTask, setSelectedTask] = useState<ListTasksInterface | null>(
    null
  );

  const [modalMode, setModalMode] = useState<
    "deleteTask" | "updateTask" | null
  >(null);

  function handleTaskCreate(data: TaskSchemaType): void {
    const result: NewTaskInterface = {
      ...data,
      userEmail: session?.user?.email as string,
    };

    reset();

    createTaskMutation.mutate(result);
  }

  function handleTaskShare(taskId: string): void {
    navigator.clipboard.writeText(
      `estuda-mais-git-main-brenos-projects-d9dde81c.vercel.app/comments?taskId=${taskId}`
    );

    //Substitua a url para "http://localhost:sua-porta-local/comments?taskId=${taskId}" se estiver rodando localmente.
  }

  function handleOpenTaskDeleteModal(taskValues: ListTasksInterface): void {
    setIsTaskModalOpen(true);

    setSelectedTask(taskValues);

    setModalMode("deleteTask");
  }

  function handleOpenTaskUpdateModal(taskValues: ListTasksInterface): void {
    setIsTaskModalOpen(true);

    setSelectedTask(taskValues);

    setModalMode("updateTask");
  }

  useEffect(() => {
    if (createTaskMutation.isSuccess) setIsSuccessModalOpen(true);

    if (createTaskMutation.isError || taskListError) setIsErrorModalOpen(true);

    refetch();
  }, [
    createTaskMutation.isSuccess,
    createTaskMutation.isError,
    taskListError,
    refetch,
  ]);

  if (taskListLoading || createTaskMutation.isPending) return <Loading />;

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

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        modalMode={modalMode}
        taskValues={selectedTask}
        refetch={refetch}
        closeModalAfterSubmission={() => {
          setIsTaskModalOpen(false);
        }}
      />

      <Header />

      <main
        className={twMerge("bg-bg-black flex h-screen flex-col items-center")}
      >
        <section
          className={twMerge(
            "w-[1024px] px-[128px] pb-[36px]",
            "max-md:w-[800px] max-sm:w-[600px]"
          )}
        >
          <div>
            <h1
              className={twMerge(
                "font-bold text-[38px] text-white mt-[32px]",
                "max-md:text-[30px] max-sm:text-[25px]"
              )}
            >
              Qual sua tarefa?
            </h1>

            <form
              onSubmit={handleSubmit(handleTaskCreate)}
              className="flex flex-col gap-[16px]"
            >
              <div className="flex flex-col gap-[13px]">
                <label
                  htmlFor="task-field"
                  className={twMerge(
                    "text-white",
                    "max-md:text-[14px] max-sm:text-[12px]"
                  )}
                >
                  Informe a tarefa
                </label>
                <Textarea
                  id={"task-field"}
                  rows={5}
                  cols={8}
                  placeholder="Digite sua tarefa..."
                  className="resize-none"
                  register={register("task")}
                />
                {errors.task && (
                  <FormFieldErrorMessage message={errors.task.message!} />
                )}
              </div>

              <div className="flex gap-[13px] items-center">
                <input
                  type="checkbox"
                  id="public-task"
                  className={twMerge(
                    "w-[18px] h-[18px] cursor-pointer",
                    "max-md:w-[14px] max-md:h-[18px]"
                  )}
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

              <Button type="submit" variant="secondary">
                Registrar
              </Button>
            </form>
          </div>
        </section>

        {(tasksByUserEmail?.length as number) > 0 && (
          <section
            className={twMerge(
              "bg-white w-full h-full flex flex-col gap-[30px] pb-[40px] px-[20px]"
            )}
          >
            <h2
              className={twMerge(
                "text-bg-black font-bold text-[38px] text-center mt-[60px]",
                "max-md:text-[30px] max-sm:text-[25px]"
              )}
            >
              Minhas tarefas
            </h2>

            <div className="flex justify-center pb-[30px]">
              <div className="max-w-[1024px] grow text-bg-black flex flex-col gap-[16px]">
                {tasksByUserEmail?.map((task: ListTasksInterface) => {
                  return (
                    <Task
                      key={task.id}
                      text={task.task}
                      isPublic={task.isPublic}
                      taskValues={task}
                      handleTaskShare={handleTaskShare}
                      handleTaskDelete={handleOpenTaskDeleteModal}
                      handleTaskUpdate={handleOpenTaskUpdateModal}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
