"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import TransactionSection from "@/components/transactions/transactions-section";

/** Transactions Page */
export default function TransactionsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openMenu={isOpen} setOpenMenu={setIsOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <TransactionSection toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
