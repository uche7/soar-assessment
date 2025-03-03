"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import InvestmentSection from "@/components/investments/investments-section";

/** Investments Page */
export default function InvestmentsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openMenu={isOpen} setOpenMenu={setIsOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <InvestmentSection toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
