import React, { useState } from "react";
import { Link } from "react-router-dom";
import ManagerCard from "./ManagerCard";
import TerminiTable from "./TerminiTable";
import DodajTerenForm from "./DodajTerenForm";
import DodajTerminForm from "./DodajTerminForm";


function ManagerPanel() {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const handleClick = () => {
      /* here we alter the colors of navbar and everything else */
      var element = document.body;
      element.classList.toggle("dark-mode");
      console.log('Dark mode toggled');
    };

    return(
        <main className="px-16 py-6 bg-gray-100 md:col-span-2" id="walt">
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
          <button onClick={handleClick} className="text-primary btn border md:border-2 hover:bg-gray-400 hover:text-white">
            Dark Mode
          </button>
          <button
            onClick={openPopup}
            className="text-primary btn border md:border-2 hover:bg-gray-400 hover:text-white"
          >
            Sign out
          </button>
        </div>
  
        <header>
          <h2 className="text-grey-700 text-6xl font-semibold mt-4">
            Dobrodošao, menadžer!
          </h2>
        </header>

        
      <div>
        <h4 className="font-bold mt-12 pb-2 border-b border-color-gray-200">
          Moji trenutni tereni
        </h4>

        <div className="mt-8 grid lg:grid-cols-3 gap-10">
            <ManagerCard/>
            <ManagerCard/>
            <ManagerCard/>
          
        </div>
      </div>

      <h4 className="mt-12 pb-2 border-b border-color-gray-200 font-bold">
        Moji trenutni termini
      </h4>
      <div className="mt-8">
        <TerminiTable />
      </div>
      <div className="flex flex-col items-center mt-12">
            <h2 className="text-2xl pb-2 border-b border-gray-200 font-bold">
                Forme
            </h2>
            <h3 className="text-xl font-semibold mt-5">Dodaj teren!</h3>

            <div className="mt-8 w-full flex justify-center">
                <DodajTerenForm />
            </div>

            <h3 className="text-xl font-semibold border-t border-gray-200 mt-6">Dodaj Termin!</h3>

            <div className="mt-8 w-full flex justify-center">
                <DodajTerminForm />
            </div>
       </div>

  
    </main>
    );
}

export default ManagerPanel;
