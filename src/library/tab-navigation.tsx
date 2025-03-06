"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabNavigationProps } from "@/types/tab-navigation";

export const TabNavigation: React.FC<TabNavigationProps> = ({
  initialTab = "Edit Profile",
  sections,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const handleTabChange = (tab: string) => {
    console.log("Changing to:", tab);
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div>
      <motion.nav
        className="flex space-x-6 mb-8 text-sm border-[#F4F5F7] border-b-[1px]"
        initial="hidden"
        animate="visible"
      >
        {sections.map((section) => (
          <motion.a
            key={section.name}
            href="#"
            className={`pb-1 font-[500] text-[13px] lg:text-[16px] leading-[100%] ${
              activeTab === section.name
                ? "text-[#232323] border-b-[3px] border-[#232323] rounded-tl-[10px] rounded-tr-[10px]"
                : "text-[#718EBF]"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleTabChange(section.name);
            }}
            variants={tabVariants}
          >
            {section.name}
          </motion.a>
        ))}
      </motion.nav>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="p-4 lg:py-[41px] lg:px-[30px]"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
            exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
          }}
        >
          {sections.find((s) => s.name === activeTab)?.component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
