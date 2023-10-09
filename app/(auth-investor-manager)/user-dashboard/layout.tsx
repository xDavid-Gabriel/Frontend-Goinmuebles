import type { Metadata } from "next";
import "../../globals.css";
import { SidebarNav, Bottombar } from "@/components/shared";
export const metadata: Metadata = {
  title: "Panel de usuario",
  description: "La información del usuario",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="md:flex flex-row">
        <SidebarNav />
        <section className="md:flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-28 md:pb-32 sm:px-10">
          <div className="w-full md:max-w-[35rem] lg:max-w-[51rem] xl:max-w-[50rem] 2xl:max-w-[67rem]">
            {children}
          </div>
        </section>
      </main>
      <Bottombar />
    </>
  );
}
