import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";


function LoginPage() {
 
    return (
      <div className="text-gray-600 font-mono">
        <div className="grid md:grid-cols-3">
          <Navbar />
          <LoginForm/>
        </div>
      </div>
    );
  }

export default LoginPage;
