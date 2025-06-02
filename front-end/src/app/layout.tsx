import type { Metadata } from "next";
import "./globals.css";
import Loading from "./loading";
import { ReactQueryProvider, AuthSessionProvider } from "@/providers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
  description: "Página de início.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AuthSessionProvider>
          <ReactQueryProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </ReactQueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
