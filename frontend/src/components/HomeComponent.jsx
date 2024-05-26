import React, { useContext } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function HomeComponent() {
  const { isLoggedIn, logout } = useContext(AuthContext);

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
              to={"/login"}
              className="text-primary btn border md:border-2 hover:bg-gray-400 hover:text-white"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="text-primary ml-2 btn border md:border-2 hover:bg-gray-400 hover:text-white"
            >
              Sign up
            </Link>
          </>
        )}
      </div>

      <header>
        <h2 className="text-grey-700 text-6xl font-semibold mt-4">Sportsman</h2>
        <h3 className="text-2xl font-semibold">Postani dio ekipe!</h3>
      </header>

      <div>
        <h4 className="font-bold mt-12 pb-2 border-b border-color-gray-200">
          Posljednje dodano
        </h4>

        <div className="mt-8 grid lg:grid-cols-3 gap-10">
          <Card />
          <Card />
          <Card />
        </div>
      </div>

      <h4 className="mt-12 pb-2 border-b border-color-gray-200">
        Najpopularnije
      </h4>
      <div className="mt-8 grid lg:grid-cols-3 gap-10">
        <Card />
        <Card />
        <Card />
      </div>

      <div className="flex justify-center">
        <div className="text-primary ml-2 btn border md:border-2 hover:bg-gray-400 hover:text-white mt-4">
          <Link to={"/login"}>Prijavi se za više</Link>
        </div>
      </div>
    </main>
  );
}

export default HomeComponent;
