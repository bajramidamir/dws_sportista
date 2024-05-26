import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AdminPanel from "../components/AdminPanel";

function AdminPage() {

    return (
      <div className="text-gray-600 font-mono">
        <div className="grid md:grid-cols-3">
          <Navbar />
          <AdminPanel/>
        </div>
      </div>
    );
  }

export default AdminPage;
