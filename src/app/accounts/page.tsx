"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import AccountSection from "@/components/accounts/accounts-section";

/** Accounts Page */
export default function AccountsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openMenu={isOpen} setOpenMenu={setIsOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <AccountSection toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
