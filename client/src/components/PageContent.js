// Import resources
import React from "react";

// Import custom files
//import FloatingButtonScroll from "./FloatingButtonScroll";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTopRouter from "./ScrollToTopRouter";

// Component
function PageContent({ children }) {
  // Return
  return (
    <div className="page-container">
      {/** Include top files */}
      <Header />
      <ScrollToTopRouter />

      {/** Inidividual pages as children */}
      <div className="pt-5">{children}</div>

      {/** Include bottom files */}
      <div className="footer-container">
        <Footer />
      </div>

      {/** Scroll to top */}
      {/* <FloatingButtonScroll /> */}
    </div>
  );
}

// Export
export default PageContent;
