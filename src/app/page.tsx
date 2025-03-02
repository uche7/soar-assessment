"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import OverviewSection from "@/components/overview/overview-section";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openMenu={isOpen} setOpenMenu={setIsOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <OverviewSection toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
