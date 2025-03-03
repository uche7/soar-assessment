import React from "react";
import { Navigation } from "../navigation";
import { Overview } from "./overview";

/** Overview Section */
function OverviewSection({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="Overview" toggleSidebar={toggleSidebar} />
      </div>
      <div>
        <Overview />
      </div>
    </section>
  );
}

export default OverviewSection;
