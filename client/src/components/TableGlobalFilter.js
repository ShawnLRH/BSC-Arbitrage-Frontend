// Import resources
import React from "react";

// Component
function TableGlobalFilter({
  filter,
  setFilter,
  divClass,
  inputClass,
  ...rest
}) {
  // Retuurn
  return (
    <div className={divClass}>
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className={`form-control ${inputClass}`}
        {...rest}
      />
    </div>
  );
}

// Export
export default TableGlobalFilter;
