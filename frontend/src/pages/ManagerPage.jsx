import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ManagerPanel from "../components/ManagerPanel";

function ManagerPage() {

    return (
      <div className="text-gray-600 font-mono">
        <div className="grid md:grid-cols-3">
          <Navbar />
          <ManagerPanel/>
        </div>
      </div>
    );
  }

export default ManagerPage;
