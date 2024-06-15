import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import Footer from "../components/Footer";
import { AuthContext } from "../AuthProvider";

function UserProfilePage() {
  const [userData, setUserData] = useState(null);
  const { userData: contextUserData } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (contextUserData) {
        try {
          const response = await fetch("http://localhost:8000/users/me", {
            headers: {
              Authorization: `Bearer ${contextUserData.token}`,
            },
            method: "POST",
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setUserData(data);
          } else {
            console.log("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    fetchUserData();
  }, [contextUserData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-gray-600 font-mono bg-orange-300">
      <div className="grid md:grid-cols-3">
        <Navbar />
        <UserCard
          first_name={userData.first_name}
          last_name={userData.last_name}
          username={userData.username}
          email={userData.email}
          city={userData.city}
          fitness_level={userData.fitness_level}
          preferred_sport={userData.preferred_sport}
          matches_played={userData.matches_played}
        />
      </div>
      <Footer />
    </div>
  );
}

export default UserProfilePage;
