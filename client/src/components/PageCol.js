// Import resources
import React from "react";

// Component
function PageCol({ children, colClass }) {
  return <div className={colClass}>{children}</div>;
}

// Export
export default PageCol;
