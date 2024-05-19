import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";


function SignupPage() {
 
    return (
      <div className="text-gray-600 font-mono">
        <div className="grid md:grid-cols-3">
          <Navbar />
          <SignupForm/>
        </div>
      </div>
    );
  }

export default SignupPage;
