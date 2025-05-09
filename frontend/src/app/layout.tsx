import type { Metadata } from "next";

import "./globals.css";
import HeaderBar from "./header-bar";
import { getCurrentDeploymentVersion } from "@/utils";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Todos Example Application",
  description: "A simple todos example application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased w-screen h-screen bg-base text-primary transition-colors font-display">
        <ClerkProvider>
          <main>
            <HeaderBar />
            <div className="pt-[100px] overflow-y-auto px-4 pb-12">
              <div className="container mx-auto">{children}</div>
            </div>
            <div className="footer fixed bottom-0 right-0">
              <div className="container mx-auto p-4">
                <p className="text-sm text-center text-primary/90">
                  {await getCurrentDeploymentVersion()}
                </p>
              </div>
            </div>
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
