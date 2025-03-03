"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import CreditCardSection from "@/components/credit-cards/credit-cards-section";

/** Credit Cards Page */
export default function CreditCardsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openMenu={isOpen} setOpenMenu={setIsOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <CreditCardSection toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
