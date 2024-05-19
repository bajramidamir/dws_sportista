import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HomeComponent from "../components/HomeComponent";

function HomePage() {
 
    return (
      <div className="text-gray-600 font-mono">
        <div className="grid md:grid-cols-3">
          <Navbar />
          <HomeComponent />
        </div>
      </div>
    );
  }

export default HomePage;
