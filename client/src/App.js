// Import resources
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import custom files
import Home from "./pages/Home";
import FloatingButtonScroll from "./components/FloatingButtonScroll";

// Component
function App() {
  // Return component
  return (
    <>
      {/* Define navigation router */}
      <BrowserRouter>
        {/** Routes */}
        <Routes>
          {/** First paint routes */}
          <Route path="/" element={<Home />} />
        </Routes>

        {/** Floating Buttons */}
        <FloatingButtonScroll />
      </BrowserRouter>
    </>
  );
}

export default App;
