"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import LoanSection from "@/components/loans/loans-sections";

/** Loans Page */
export default function LoansPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openMenu={isOpen} setOpenMenu={setIsOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <LoanSection toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
