import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import ManagerCard from "./ManagerCard";
import DodajTerenForm from "./DodajTerenForm";
import DodajTerminForm from "./DodajTerminForm";

const ManagerPanel = () => {
  const [courtsOwned, setCourtsOwned] = useState([]);
  const { isLoggedIn, userData, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourtsOwned = async () => {
      if (userData) {
        try {
          const response = await fetch("http://localhost:8000/courts/manager", {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setCourtsOwned(data);
          } else {
            console.error("Failed to fetch courts owned by manager");
          }
        } catch (error) {
          console.error("Failed to fetch courts owned by manager:", error);
        }
      }
    };

    fetchCourtsOwned();
  }, [userData]);


  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-2">
      <div className="flex justify-center sm:justify-center md:justify-end">
        {isLoggedIn ? (
          <button
            className="text-primary btn border md:border-2 hover:bg-gray-400 hover:text-white"
            onClick={logout}
          >
            Sign out
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-primary btn border md:border-2 hover:bg-gray-400 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-primary ml-2 btn border md:border-2 hover:bg-gray-400 hover:text-white"
            >
              Sign up
            </Link>
          </>
        )}
      </div>

      <header>
        <h2 className="text-grey-700 text-6xl font-semibold mt-4">
          Welcome, Manager!
        </h2>
      </header>

      <div>
        <h4 className="font-bold mt-12 pb-2 border-b border-color-gray-200">
          My Current Courts
        </h4>

        <div className="mt-8 grid lg:grid-cols-3 gap-10">
          {courtsOwned.map((court) => (
            <ManagerCard
              key={court.id}
              name={court.name}
              location={court.city}
              sport={court.sports.join(", ")}
              imageLink={court.image_link}
              courtType={court.court_type}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-12">
        <h2 className="text-2xl pb-2 border-b border-gray-200 font-bold">
          Forms
        </h2>

        <h3 className="text-xl font-semibold mt-5">Add Court</h3>
        <div className="mt-8 w-full flex justify-center">
          <DodajTerenForm />
        </div>

        <h3 className="text-xl font-semibold border-t border-gray-200 mt-6">
          Add Appointment
        </h3>
        <div className="mt-8 w-full flex justify-center">
          <DodajTerminForm />
        </div>
      </div>
    </main>
  );
};

export default ManagerPanel;
