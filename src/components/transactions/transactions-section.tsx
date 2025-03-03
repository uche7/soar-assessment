import React from "react";
import { Navigation } from "../navigation";
import { Transactions } from "./transactions";

/** Transactions Section */
function TransactionSection({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="Transactions" toggleSidebar={toggleSidebar} />
      </div>
      <div>
        <Transactions />
      </div>
    </section>
  );
}

export default TransactionSection;
