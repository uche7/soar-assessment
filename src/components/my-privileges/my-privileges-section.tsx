import React from "react";
import { Navigation } from "../navigation";
import { MyPrivileges } from "./my-privileges";

/** My Privileges Section */
function MyPrivilegesSection({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="My Privileges"  toggleSidebar={toggleSidebar} />
      </div>
      <div>
        <MyPrivileges />
      </div>
    </section>
  );
}

export default MyPrivilegesSection;
