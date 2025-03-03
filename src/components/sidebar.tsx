import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CheckBookIcon from "@/assets/icons/check-book.svg";
import { DashboardNonAuthRoutes } from "@/utils/urls";
import { SidebarList } from "./sidebar-list";

/** Dashboard SideBar */
export const Sidebar = ({
  openMenu,
  setOpenMenu,
}: {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu, setOpenMenu]);

  /** Desktop View */
  const desktopView = () => {
    return (
      <div
        className={`min-h-screen ${
          isOpen ? "w-[250px]" : "w-20"
        } hidden lg:block transition-all duration-300 shadow`}
      >
        <div className="relative flex items-center gap-[10px] py-[31px] pl-[30px] ">
          <Image
            className={`text-xl cursor-pointer w-[30px] ${
              !isOpen && "hidden md:block"
            }`}
            src={CheckBookIcon}
            alt={"Check Book Icon"}
            onClick={() => router.push(DashboardNonAuthRoutes.dashboard)}
          />
          <h3 className="font-[800] text-[#343C6A] text-[25px] leading-[30.26px]">
            Soar Task
          </h3>
        </div>
        <aside className="mt-[20px]" onClick={() => setIsOpen(true)}>
          <SidebarList isOpen={isOpen} />
        </aside>
      </div>
    );
  };

  /** Tablet and Mobile View */
  const tabletmobileView = () => {
    return (
      <>
        {openMenu && (
          <div
            ref={sidebarRef}
            className="lg:hidden min-h-screen w-[260px] z-[5000] absolute bg-white transition-all duration-300 border-r-[1px] border-[#E4E7EC]"
          >
            <div className="relative flex flex-row gap-2 p-[20px]">
              <Image
                className="text-xl cursor-pointer"
                src={CheckBookIcon}
                alt={"Check Book Icon"}
                onClick={() => router.push(DashboardNonAuthRoutes.dashboard)}
              />
              <h3 className="font-[800] text-[#343C6A] text-[25px] leading-[30.26px]">
                Soar Task
              </h3>
            </div>
            <aside className="mt-[10px]">
              <SidebarList />
            </aside>
          </div>
        )}
      </>
    );
  };

  return (
    <section>
      {desktopView()}
      {tabletmobileView()}
    </section>
  );
};
