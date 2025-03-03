import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar_DTO } from "@/dto/sidebar.dto";

/** Sidebar List */
export const SidebarList = ({ isOpen }: { isOpen?: unknown }) => {
  const router = useRouter();
  const pathname = usePathname();
  const investorSidebarData = useMemo(() => Sidebar_DTO(router), [router]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Determine the active index based on the current route
  useEffect(() => {
    const activeItemIndex = investorSidebarData.findIndex(
      (item) => item.routePath === pathname // Compare with routePath
    );
    setActiveIndex(activeItemIndex !== -1 ? activeItemIndex : null);
  }, [pathname, investorSidebarData]);

  const handleClick = (index: number, route?: () => void) => {
    setActiveIndex(index);
    if (route) {
      route();
    }
  };

  /** Desktop View */
  const desktopView = () => {
    return (
      <>
        {investorSidebarData.map((item, index) => (
          <div
            key={index}
            className={`lg:flex items-center py-3 mt-2 pl-[30px] hidden rounded cursor-pointer ${
              activeIndex === index
                ? `relative flex items-center rounded-xl py-3 text-[15px] font-medium transition-colors
                  text-[#232323] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-r-md before:bg-black`
                : "hover:bg-gray-100 text-gray-400 hover:text-[#232323] rounded-md"
            }`}
            onClick={() => handleClick(index, item.route)}
          >
            <Image
              className={`w-[20px] h-[20px] ${
                activeIndex === index ? "opacity-100" : "opacity-50"
              }`}
              src={item.Icon}
              alt={item.text}
            />
            <span
              className={`ml-4 ${
                !isOpen && "hidden"
              } font-[500] font-inter text-[15px] leading-[21.78px] group-hover:block select-none`}
            >
              {item.text}
            </span>
          </div>
        ))}
      </>
    );
  };

  /** Tablet and Mobile View */
  const tabletMobileView = () => {
    return (
      <>
        {investorSidebarData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center py-2 pl-[30px] mt-2 lg:hidden rounded cursor-pointer ${
              activeIndex === index
                ? `relative flex items-center py-2 rounded-xl text-[15px] font-medium transition-colors
                  text-[#232323] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-r-md before:bg-black`
                : "hover:bg-gray-100 text-gray-400 hover:text-[#232323] rounded-md"
            }`}
            onClick={() => handleClick(index, item.route)}
          >
            <Image
              className={`w-[20px] h-[20px] ${
                activeIndex === index ? "opacity-100" : "opacity-50"
              }`}
              src={item.Icon}
              alt={item.text}
            />
            <span className="ml-4 font-[500] font-inter text-[15px] leading-[21.78px] group-hover:block select-none">
              {item.text}
            </span>
          </div>
        ))}
      </>
    );
  };

  return (
    <section>
      {desktopView()}
      {tabletMobileView()}
    </section>
  );
};
