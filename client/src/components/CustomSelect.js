// Import resources
import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

// Import custom files

// Component
function CustomSelect({ label, name, children, ...rest }) {
  // Return component
  return (
    <>
      <Form.Group className="mb-3" controlId={name}>
        <FloatingLabel controlId="floatingSelect" label={label}>
          <Form.Select {...rest}>{children}</Form.Select>
        </FloatingLabel>
      </Form.Group>
    </>
  );
}

// Export
export default CustomSelect;
