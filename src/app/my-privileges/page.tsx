"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import MyPrivilegesSection from "@/components/my-privileges/my-privileges-section";

/** My Privileges Page */
export default function MyPrivilegesPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openMenu={isOpen} setOpenMenu={setIsOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <MyPrivilegesSection toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
