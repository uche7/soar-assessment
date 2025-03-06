"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setLanguage,
  setTheme,
  toggleNotifications,
} from "../../../redux/setting/preferences-slice";

/** Preferences Section */
const PreferencesSection: React.FC = () => {
  const dispatch = useDispatch();
  const { language, theme, notifications } = useSelector(
    (state: RootState) => state.preferences
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(e.target.value));
  };

  const handleNotificationsChange = () => {
    dispatch(toggleNotifications());
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
          value={language}
          onChange={handleLanguageChange}
          className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
          text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
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
          value={theme}
          onChange={handleThemeChange}
          className={`w-full py-[13px] lg:py-[16px] px-[15px] lg:px-[20px] border-[1px] border-[#DFEAF2] font-[400] text-[#718EBF]
            text-[12px] lg:text-[15px] leading-[100%] rounded-[10px] lg:rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#718EBF]`}
        >
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
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
          checked={notifications}
          onChange={handleNotificationsChange}
          className="w-5 h-5 border-gray-300 rounded focus:outline-none cursor-pointer"
        />
        <span className="ml-2 text-gray-600">Enable Notifications</span>
      </motion.div>
    </motion.div>
  );
};

export default PreferencesSection;
