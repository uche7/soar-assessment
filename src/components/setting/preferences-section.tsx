"use client";

import React from "react";
import { motion } from "framer-motion";

/** Preferences Section */
const PreferencesSection: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div variants={itemVariants}>
        <label
          htmlFor="language"
          className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
        >
          Language
        </label>
        <select
          id="language"
          aria-label="Select Language"
          className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
          text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
        >
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </motion.div>
      <motion.div variants={itemVariants}>
        <label
          htmlFor="theme"
          className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
        >
          Theme
        </label>
        <select
          id="theme"
          aria-label="Select Theme"
          className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
            text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
        >
          <option>Light</option>
          <option>Dark</option>
        </select>
      </motion.div>
      <motion.div variants={itemVariants}>
        <label
          htmlFor="notifications"
          className="block font-[400] text-[#232323] text-[16px] mb-[11px] leading-[100%]"
        >
          Notifications
        </label>
        <input
          id="notifications"
          type="checkbox"
          aria-label="Notifications"
          className="w-5 h-5 border-gray-300 rounded focus:outline-none cursor-pointer"
        />
        <span className="ml-2 text-gray-600">Enable Notifications</span>
      </motion.div>
    </motion.div>
  );
};

export default PreferencesSection;
