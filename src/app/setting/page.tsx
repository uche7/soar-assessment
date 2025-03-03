"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import SettingSection from "@/components/setting/setting-section";

/** setting Page */
export default function SettingPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openMenu={isOpen} setOpenMenu={setIsOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <SettingSection toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
