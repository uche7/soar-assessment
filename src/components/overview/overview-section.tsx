import React from "react";
import { Overview } from "./overview";
import { Navigation } from "../navigation";

/** Overview Section */
function OverviewSection({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="Overview" toggleSidebar={toggleSidebar} />
      </div>

      <Overview />
    </section>
  );
}

export default OverviewSection;
