// Import resources
import React from "react";
import { Link } from "react-router-dom";

// Import custom files
import PageSection from "./PageSection";

// Component
function Footer() {
  // Return
  return (
    <PageSection sectionClass="bg-dark text-white text-center p-3">
      {/** Copyright text */}
      <div>
        &copy; {new Date().getFullYear()}
        <Link to="/" className="text-decoration-underline text-white ms-1">
          Shawn Lee
        </Link>
      </div>
    </PageSection>
  );
}

// Export
export default Footer;
