"use client";

import { twMerge } from "tailwind-merge";
import { Header, Textarea, Button, Comment } from "@/components";

export default function CommentsPage() {
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
            placeholder="Digite sua tarefa..."
            className={twMerge(
              "w-full resize-none",
              "border border border-solid border-dark-gray"
            )}
            disabled={true}
          />
        </section>

        <section
          className={twMerge(
            "px-[128px] mt-[75px]",
            "w-[1024px] max-md:w-[800px] max-sm:w-[600px]"
          )}
        >
          <form>
            <div className="flex flex-col gap-[14px]">
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
              />
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
            <Comment text="Teste de task sdfjdsjfdsk jskdfjdksjkfjdskjf sdkfdskjf kdsjfkdsjf ksdjfkdsj sjdlfkjdskf kjdskfksdjfkjs djdskfkdskfds sdkfsd" />
            <Comment text="Teste de task" />
            <Comment text="Teste de task" />
            <Comment text="Teste de task" />
          </div>
        </section>
      </main>
    </>
  );
}
