import React from "react";
import { Navigation } from "../navigation";
import Setting from "./setting";

/** Setting Section */
function SettingSection({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="Setting" toggleSidebar={toggleSidebar} />
      </div>
      <div>
        <Setting />
      </div>
    </section>
  );
}

export default SettingSection;
