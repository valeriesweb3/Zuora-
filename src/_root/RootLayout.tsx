import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from '@/components/shared/LeftSidebar';

const RootLayout = () => {
  return (
    <div className="w-full md:flex flex-col">
      <Topbar />
      <div className="w-full md:flex">

      <LeftSidebar />

        <section className="flex flex-1 h-full">
          <Outlet />
        </section>
      </div>
      

      <Bottombar />
    </div>
  );
};

export default RootLayout;