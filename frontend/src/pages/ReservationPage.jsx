import React from "react";
import Reservation from "../components/Reservation";
import Navbar from "../components/Navbar";


function ReservationPage() {
    return(
        <div className="text-gray-600 font-mono">
        <div className="grid md:grid-cols-3">
          <Navbar />
          <Reservation />
        </div>
      </div>
    )

}

export default ReservationPage;
