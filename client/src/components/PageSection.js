// Import resources
import React from "react";

// Component
function PageSection({ children, sectionClass, isFluid, ...props }) {
  return (
    <section className={sectionClass} {...props}>
      <div className={isFluid ? "container-fluid" : "container"}>
        <div className="row">{children}</div>
      </div>
    </section>
  );
}

// Export
export default PageSection;
