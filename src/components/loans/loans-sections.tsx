import React from "react";
import { Navigation } from "../navigation";
import { Loans } from "./loans";

/** Loans Section */
function LoanSection({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="Loans"  toggleSidebar={toggleSidebar} />
      </div>
      <div>
        <Loans />
      </div>
    </section>
  );
}

export default LoanSection;
