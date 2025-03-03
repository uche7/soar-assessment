"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import ServieceSection from "@/components/services/services-section";

/** Services Page */
export default function ServicesPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openMenu={isOpen} setOpenMenu={setIsOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <ServieceSection toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
