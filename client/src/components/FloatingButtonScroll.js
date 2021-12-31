// Import resources
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

// Export
export default function FloatingButtonScroll() {
  // Define button visibility state
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // Make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Load this effect once on page load
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Return
  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="floating-btn-scroll">
          <FaArrowUp />
        </button>
      )}
    </>
  );
}
