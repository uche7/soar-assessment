import React from "react";
import { Navigation } from "../navigation";
import { Services } from "../services/services";

/** Services Section */
function ServieceSection({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section>
      <div className="sticky top-0 z-[1000]">
        <Navigation navTitle="Services" toggleSidebar={toggleSidebar} />
      </div>
      <div>
        <Services />
      </div>
    </section>
  );
}

export default ServieceSection;
