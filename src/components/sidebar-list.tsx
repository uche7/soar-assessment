import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sidebar_DTO } from "@/dto/sidebar.dto";

export const SidebarList = ({ isOpen }: { isOpen?: unknown }) => {
  const Router = useRouter();
  const investorSidebarData = useMemo(() => Sidebar_DTO(Router), [Router]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Retrieve activeIndex from localStorage when the component mounts
  useEffect(() => {
    const savedIndex = localStorage.getItem("activeSidebarIndex");
    if (savedIndex !== null) {
      setActiveIndex(parseInt(savedIndex, 10));
    }
  }, []);

  const handleClick = (index: number, route?: () => void) => {
    setActiveIndex(index);
    // Save the index to localStorage
    localStorage.setItem("activeSidebarIndex", index.toString());
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
            className={`flex items-center p-2 mt-2 mx-[16px] TabletScreen:hidden MobileScreen:hidden hover:bg-[#D4F7E4] hover:text-[#199B6C] rounded-md cursor-pointer ${
              activeIndex === index
                ? "bg-[#D4F7E4] text-[#199B6C] font-[500]"
                : "hover:bg-[#D4F7E4] hover:text-[#199B6C]"
            }`}
            onClick={() => handleClick(index, item.route)}
          >
            <Image
              className="hover:text-[#199B6C]"
              src={item.Icon}
              alt={item.text}
            />
            <span
              className={`ml-4 ${
                !isOpen && "hidden"
              } font-[400] hover:font-[500] text-[16px] leading-[19.09px] group-hover:block select-none`}
            >
              {item.text}
            </span>
          </div>
        ))}
      </>
    );
  };

  /** Tablet View */
  const tabletView = () => {
    return (
      <>
        {investorSidebarData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-2 mt-2 mx-[16px] lg:hidden MobileScreen:hidden hover:bg-[#D4F7E4] hover:text-[#199B6C]  rounded-md cursor-pointer ${
              activeIndex === index
                ? "bg-[#D4F7E4] text-[#199B6C] font-[500]"
                : "hover:bg-[#D4F7E4] hover:text-[#199B6C]"
            }`}
            onClick={() => handleClick(index, item.route)}
          >
            <Image
              className="hover:text-[#199B6C]"
              src={item.Icon}
              alt={item.text}
            ></Image>
            <span className="ml-4 font-[400] hover:font-[500] text-[16px] leading-[19.09px] group-hover:block select-none">
              {item.text}
            </span>
          </div>
        ))}
      </>
    );
  };

  /** Mobile View */
  const mobileView = () => {
    return (
      <>
        {investorSidebarData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-2 mt-2 mx-[16px] hidden TabletScreen:hidden hover:bg-[#D4F7E4] hover:text-[#199B6C]  rounded-md cursor-pointer ${
              activeIndex === index
                ? "bg-[#D4F7E4] text-[#199B6C] font-[500]"
                : "hover:bg-[#D4F7E4] hover:text-[#199B6C]"
            }`}
            onClick={() => handleClick(index, item.route)}
          >
            <Image
              className="hover:text-[#199B6C]"
              src={item.Icon}
              alt={item.text}
            ></Image>
            <span className="ml-4 font-[400] hover:font-[500] text-[16px] leading-[19.09px] group-hover:block select-none">
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
      {tabletView()}
      {mobileView()}
    </section>
  );
};
