"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import SearchBar from "./search-bar";
import { useRouter } from "next/navigation";
import MenuIcon from "@/assets/icons/menu-icon.svg";
import { Navigation_DTO } from "@/dto/navigation.dto";
import { DashboardNonAuthRoutes } from "@/utils/urls";
import Profile_Pic from "@/assets/images/profile-pic.svg";
import { motion } from "framer-motion";

/** Default Profile Image URL */
const defaultProfilePic =
  typeof Profile_Pic === "string" ? Profile_Pic : Profile_Pic.src;

/** Navigation Bar */
export const Navigation = ({
  navTitle,
  toggleSidebar,
}: {
  navTitle: string;
  toggleSidebar: () => void;
}) => {
  const Router = useRouter();
  const [profileImage, setProfileImage] = useState<string>(defaultProfilePic);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigationIconsData = useMemo(() => Navigation_DTO(Router), [Router]);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("userProfile");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setProfileImage(parsedData?.profileImage || defaultProfilePic);
      }
    } catch (error) {
      console.error("Failed to parse userProfile from localStorage:", error);
      setProfileImage(defaultProfilePic);
    }
  }, []);

  /** Desktop View */
  const desktopView = () => {
    return (
      <div className="hidden lg:flex bg-white flex-row justify-between items-center border-gray-100 border-l-1 shadow px-[30px] pt-[25px] pb-[15px]">
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
              aria-label={item.alt} // Improves accessibility
              role="button" // Ensures screen readers recognize it as an interactive element
              tabIndex={0} // Makes it keyboard accessible
              onKeyDown={(e) => e.key === "Enter" && item.route()} // Allows navigation via Enter key
            />
          ))}

          {/* Profile Image as Background */}
          <motion.div
            className="w-[80px] h-[50px] cursor-pointer rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${profileImage})` }}
            onClick={() => Router.push(DashboardNonAuthRoutes.setting)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            role="button"
            aria-label="Profile settings"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && Router.push(DashboardNonAuthRoutes.setting)
            }
          />
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
            alt="Menu Icon"
            className="cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Open sidebar menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleSidebar()}
          />

          <h3
            className="font-[600] text-[#343C6A] text-[20px] leading-[24.2px]"
            onClick={() => Router.push(DashboardNonAuthRoutes.dashboard)}
          >
            {navTitle}
          </h3>
          <motion.div
            className="w-[35px] h-[35px] cursor-pointer rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${profileImage})` }}
            onClick={() => Router.push(DashboardNonAuthRoutes.setting)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
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
