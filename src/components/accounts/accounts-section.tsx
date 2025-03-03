import React from "react";
import { Navigation } from "../navigation";
import { Accounts } from "./accounts";

/** Overview Section */
function AccountSection({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="Accounts" toggleSidebar={toggleSidebar} />
      </div>
      <div>
        <Accounts />
      </div>
    </section>
  );
}

export default AccountSection;
