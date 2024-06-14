import React, { useState } from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import Footer from "../components/Footer";


function UserProfilePage() {

    return (
      <div className="text-gray-600 font-mono bg-orange-300">
        <div className="grid md:grid-cols-3">
          <Navbar />
          <UserCard
            first_name= "Mujo"
            last_name= "Mujic"
            username= "jasambot"
            email= "neki@primjer.com"
            city= "Sarajevo"
            fitness_level= "Begginer"
            preferred_sport= "Futbal"
            matches_played= "15"
          />
          
          
        </div>
        <Footer/>
      </div>
    );
  }

export default UserProfilePage;
