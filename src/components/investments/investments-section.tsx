import React from "react";
import { Navigation } from "../navigation";
import { Investments } from "./investments";

/** Investments Section */
function InvestmentSection({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="Investments" toggleSidebar={toggleSidebar} />
      </div>
      <div>
        <Investments />
      </div>
    </section>
  );
}

export default InvestmentSection;
