import React from "react";
import { Navigation } from "../navigation";
import CreditCards from "./credit-cards";

/** Credit Cards Section */
function CreditCardSection({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="Credit Cards" toggleSidebar={toggleSidebar} />
      </div>
      <div>
        <CreditCards />
      </div>
    </section>
  );
}

export default CreditCardSection;
