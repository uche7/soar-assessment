"use client";

import React from "react"; // No need for useState in Setting anymore
import { TabNavigation } from "@/library/tab-navigation";
import EditProfileSection from "@/components/setting/edit-profile-section";
import PreferencesSection from "@/components/setting/preferences-section";
import SecuritySection from "@/components/setting/security-section";

const Setting = () => {
  const sections = [
    { name: "Edit Profile", component: <EditProfileSection /> },
    { name: "Preferences", component: <PreferencesSection /> },
    { name: "Security", component: <SecuritySection /> },
  ];

  // Optional: Log tab changes if needed
  const handleTabChange = (tab: string) => {
    console.log("Active tab changed to:", tab);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-[30px] rounded-[25px] mt-[24px] md:mx-[40px] mb-[39px]">
      <div className="max-w-4xl mx-auto">
        <TabNavigation
          initialTab="Edit Profile" // Pass the initial tab
          sections={sections}
          onTabChange={handleTabChange} // Optional: Pass a callback to listen for tab changes
        />
      </div>
    </div>
  );
};

export default Setting;
