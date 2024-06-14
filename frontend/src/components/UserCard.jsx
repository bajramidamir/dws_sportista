import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import TerminiTable from "./TerminiTable";



const UserCard = ({ first_name, last_name, username, email, city,fitness_level, preferred_sport, matches_played }) => {
   
    const { isLoggedIn, logout, userData } = useContext(AuthContext);
   
    return (

        <main className="px-4 sm:px-16 py-6 bg-gray-100 md:col-span-2">
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
      
            
            <section className="mt-3 mb-2 border bg-neutral-100 p-4 rounded-lg max-w-full flex justify-center items-center">
                <div className="mx-auto justify-center">
                    <div className="card md:flex max-w-lg">
                        <div className="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
                            <img className="object-cover rounded-full" src="https://tailwindflex.com/public/images/user.png"/>
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            
                                <p>@{username}</p>
                              
                            <p className=""><span className="font-bold">Ime:</span> {first_name}</p>
                            <h3 className=""><span className="font-bold">Prezime:</span> {last_name}</h3>
                            <p className="mt-2 mb-3"><span className="font-bold">E-mail:</span>{email}</p>
                            <div className="mb-3">
                                <span className="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm mr-2">{fitness_level}</span>
                                <span className="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm mr-2">{preferred_sport}</span> 
                                <span className="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm mr-2">{city}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  


        <div>
            <h4 className="font-bold mt-12 pb-2 border-b border-color-gray-200">
                Informacije o mečevima
            </h4>

            <div className="mt-8 grid lg:grid-cols-3 gap-10">

            <div className="card text-center flex flex-col justify-center items-center">
                <h4 className="text-xl font-semibold">Merit</h4>
                <div className="m-4">
                <h2 className="text-2xl">5</h2>
                </div>
            </div>
            
            <div className="card text-center flex flex-col justify-center items-center">
                <h4 className="text-xl font-semibold">Broj odigrnaih</h4>
                <div className="m-4">
                <h2 className="text-2xl">{matches_played}</h2>
                </div>
            </div>

            

            <div className="card text-center flex flex-col justify-center items-center">
                <h4 className="text-xl font-semibold">Broj prijavljenih</h4>
                <div className="m-4">
                <h2 className="text-2xl">0</h2>
                </div>
            </div>
            </div>
      </div>


      <div>      
        <h4 className="font-bold mt-12 pb-2 border-b border-color-gray-200 mb-2">
            Prijavljeni termini
        </h4>
        <TerminiTable/>
     </div>

     
     <div>      
        <h4 className="font-bold mt-12 pb-2 border-b border-color-gray-200 mb-2">
            Odigrani termini
        </h4>
        <TerminiTable/>
     </div>
       

            

       </main>
    );
}

export default UserCard;
