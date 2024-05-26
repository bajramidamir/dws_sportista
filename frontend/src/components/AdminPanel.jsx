import React, { useState } from "react";
import { Link } from "react-router-dom";
import ManagersTable from "./ManagersTable";
import ManagerRequestTable from "./ManagerRequestTable";
import TereniTable from "./TereniTable";
import DodajTerenForm from "./DodajTerenForm";
import TerminiTable from "./TerminiTable";
import DodajTerminForm from "./DodajTerminForm"

const AdminPanel = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-2">
      {/* Popup za odjavu */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">
              Jeste li sigurni da se želite odjaviti?
            </h2>
            <div className="flex justify-end">
              <button className="text-primary mr-4" onClick={closePopup}>
                Odustani
              </button>
              <Link to="/" className="text-red-600 font-bold">
                Odjavi se
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Sign out button */}
      <div className="flex justify-center sm:justify-center md:justify-end">
        <button
          onClick={openPopup}
          className="text-primary btn border md:border-2 hover:bg-gray-400 hover:text-white"
        >
          Sign out
        </button>
      </div>

      <header>
        <h2 className="text-grey-700 text-6xl font-semibold mt-4">
          Dobrodošao, Admin!
        </h2>
      </header>

      <div>
        <h4 className="font-bold mt-12 pb-2 border-b border-color-gray-200">
          Posljednji presjek stanja
        </h4>

        <div className="mt-8 grid lg:grid-cols-3 gap-10">
         
          <div className="card text-center flex flex-col justify-center items-center">
            <h4 className="text-xl font-semibold">Trenutni broj korisnika</h4>
            <div className="m-4">
              <h2 className="text-2xl">120</h2>
            </div>
          </div>

          <div className="card text-center flex flex-col justify-center items-center">
            <h4 className="text-xl font-semibold">Trenutni broj terena</h4>
            <div className="m-4">
              <h2 className="text-2xl">120</h2>
            </div>
          </div>

          <div className="card text-center flex flex-col justify-center items-center">
            <h4 className="text-xl font-semibold">Trenutni broj menadžera</h4>
            <div className="m-4">
              <h2 className="text-2xl">120</h2>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-12 pb-2 border-b border-color-gray-200 font-bold">
        Menadžeri
      </h4>
      <div className="mt-8">
        <ManagersTable />
      </div>

      <h4 className="mt-12 pb-2 border-b border-color-gray-200 font-bold">
        Zahtjevi za menadžere
      </h4>
      <div className="mt-8">
        <ManagerRequestTable />
      </div>

      <h4 className="mt-12 pb-2 border-b border-color-gray-200 font-bold">
        Tereni
      </h4>
      <div className="mt-8">
        <TereniTable />
      </div>
      
      <h4 className="mt-12 pb-2 border-b border-color-gray-200 font-bold">
        Termini
      </h4>
      <div className="mt-8">
        <TerminiTable />
      </div>

      <h2 className="mt-12 text-2xl pb-2 border-b border-color-gray-200 font-bold">
        Forme
      </h2>
      <h3 className="text-1xl ofnt-semibold">Dodaj teren!</h3>

      <div className="mt-8">
        <DodajTerenForm />
      </div>

      <h3 className="text-1xl ofnt-semibold border-t border-color-gray-200 mt-5">Dodaj Termin!</h3>

    <div className="mt-8">
      <DodajTerminForm />
    </div>
        
    </main>
  );
};

export default AdminPanel;