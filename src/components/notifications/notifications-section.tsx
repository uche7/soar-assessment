import React from "react";
import { Navigation } from "../navigation";
import { Notifications } from "./notifications";

/** Notifications Section */
function NotificationsSection({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="Notifications" toggleSidebar={toggleSidebar} />
      </div>
      <div>
        <Notifications />
      </div>
    </section>
  );
}

export default NotificationsSection;
