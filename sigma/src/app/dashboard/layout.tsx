import Navbar from "@/components/Navbar";
import DashboardSideBar from "@/components/DashboardSideBar";
import { ReactNode } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: ReactNode;
  user: any;
}

export default function Layout({ children, user }: LayoutProps) {
  return (
    <div className="flex flex-col h-fit w-screen">
      <Navbar />
      <div className="flex flex-row w-full h-full">
        <DashboardSideBar />
        <div className="flex flex-col w-full h-full">
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="purple"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
          <div
            className="h-fit w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
          >
            <div
              // chnage the bg to bg-black-100, so it matches the bg color and will blend in
              className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
            />
          </div>
          <div className="flex-1 p-4 ml-[15rem] mt-[6rem] z-20">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
