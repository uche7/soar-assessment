import React, { useMemo, useState } from "react";
import Image from "next/image";
import SearchBar from "./search-bar";
import { useRouter } from "next/navigation";
import MenuIcon from "@/assets/icons/menu-icon.svg";
import { Navigation_DTO } from "@/dto/navigation.dto";
import { DashboardNonAuthRoutes } from "@/utils/urls";
import Profile_Pic from "@/assets/images/profile-pic.svg";

/** Navigation Bar */
export const Navigation = ({
  navTitle,
  toggleSidebar,
}: {
  navTitle: string;
  toggleSidebar: () => void;
}) => {
  const Router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigationIconsData = useMemo(() => Navigation_DTO(Router), [Router]);

  /** Desktop View */
  const desktopView = () => {
    return (
      <div className="hidden lg:flex bg-[#FFFFFF] flex flex-row justify-between items-center border-gray-100 border-l-1 shadow px-[30px] pt-[25px] pb-[15px]">
        <h3 className="font-[600] text-[#343C6A] text-[28px] leading-[33.89px]">
          {navTitle}
        </h3>

        <div className="flex flex-row gap-[20px]">
          <SearchBar
            isSearchActive={isSearchActive}
            setIsSearchActive={setIsSearchActive}
          />
          {navigationIconsData.map((item, index) => (
            <Image
              className="cursor-pointer"
              key={index}
              src={item.Icon}
              alt={item.alt}
              width={40}
              onClick={item.route}
            />
          ))}
        </div>
      </div>
    );
  };

  /** Tablet and Mobile View */
  const tabletMobileView = () => {
    return (
      <div className="lg:hidden bg-white py-[13px] px-[20px] shadow-md">
        <div className="flex flex-row items-center justify-between mb-[20px]">
          <Image
            src={MenuIcon}
            alt={"Menu Icon"}
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
          <h3
            className="font-[600] text-[#343C6A] text-[20px] leading-[24.2px]"
            onClick={() => Router.push(DashboardNonAuthRoutes.dashboard)}
          >
            {navTitle}
          </h3>
          <Image
            className="w-[35px] h-[35px] cursor-pointer"
            src={Profile_Pic}
            alt={"Profile Pic"}
            onClick={() => Router.push(DashboardNonAuthRoutes.setting)}
          />
        </div>
        <SearchBar
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
        />
      </div>
    );
  };

  return (
    <section>
      {desktopView()}
      {tabletMobileView()}
    </section>
  );
};
