import React, { useMemo } from "react";
import Inputs from "@/library/inputs";
import Image from "next/image";
import { DashboardNonAuthRoutes } from "@/utils/urls";
import CheckBookIcon from "@/assets/icons/check-book.svg";
import SearchIcon from "@/assets/icons/search-icon.svg";
// import MenuIcon from "@/assets/icons/menu-icon.svg";
import { useRouter } from "next/navigation";
import { Navigation_DTO } from "@/dto/navigation.dto";

/** Investors Navigation Bar */
export const Navigation = ({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) => {
  const Router = useRouter();
  const navigationIconsData = useMemo(() => Navigation_DTO(Router), [Router]);
  /** Desktop View */
  const desktopView = () => {
    return (
      <div
        className="md:hidden MobileScreen:hidden bg-black flex flex-row gap-[151px] border-b-[1px]
			       border-l-[1px] px-[40px] pt-[24px] pb-[16px]"
      >
        <div className="w-full h-[44px] flex flex-row rounded-[100px] border-[1px]">
          <Image
            className="my-[13px] mx-[24px] cursor-pointer"
            src={SearchIcon}
            alt={"Search Icon"}
          ></Image>
          <Inputs
            className="w-full p-2 border-none rounded-[100px] outline-none focus:ring-0"
            Name={"search"}
            inputType={"text"}
            placeholder="Search for something..."
          ></Inputs>
        </div>
        <div className="flex flex-row gap-[12px]">
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

  /** Tablet View */
  const tableView = () => {
    return (
      <div className="hidden bg-white flex flex-row justify-between py-[13px] px-[24px] shadow-md">
        <Image
          src={CheckBookIcon}
          alt={"Sefarvest Icon"}
          onClick={() => Router.push(DashboardNonAuthRoutes.dashboard)}
        ></Image>
        <div className="flex flex-row gap-[12px]">
          <Image
            src={SearchIcon}
            alt={"Search Icon"}
          ></Image>
          <Image
            src={SearchIcon}
            alt={"Menu Icon"}
            className="cursor-pointer"
            onClick={toggleSidebar}
          ></Image>
        </div>
      </div>
    );
  };

  /** Mobile View */
  const mobileView = () => {
    return (
      <div className="hidden TabletScreen:hidden bg-white flex flex-row justify-between py-[13px] px-[24px] shadow-md">
        <Image
          src={CheckBookIcon}
          alt={"Sefarvest Icon"}
          onClick={() => Router.push(DashboardNonAuthRoutes.dashboard)}
        ></Image>
        <div className="flex flex-row gap-[12px]">
          <Image
            src={SearchIcon}
            alt={"Sefarvest Search Icon"}
          ></Image>
          <Image
            src={SearchIcon}
            alt={"Sefarvest Menu Icon"}
            className="cursor-pointer"
            onClick={toggleSidebar}
          ></Image>
        </div>
      </div>
    );
  };

  return (
    <section>
      {desktopView()}
      {tableView()}
      {mobileView()}
    </section>
  );
};
