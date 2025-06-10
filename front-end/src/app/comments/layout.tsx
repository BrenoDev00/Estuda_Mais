import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comentários",
  description: "Página de comentários de tarefa.",
};

export default function CommentsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
