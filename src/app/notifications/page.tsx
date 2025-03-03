"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import NotificationsSection from "@/components/notifications/notifications-section";

/** Notifications Page */
export default function NotificationsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openMenu={isOpen} setOpenMenu={setIsOpen} />
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <NotificationsSection toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}
