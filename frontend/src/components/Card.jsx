import React from "react";

const Card = ({ naziv, lokacija, brojSlobodnihMjesta, sport, datum, vrijeme }) => {
    return (
        <div className="card">
            <img
                src="../img/teren.jpg"
                alt=""
                className="w-full h-32 sm:h-48 object-cover rounded"
            />
            <div className="m-4">
                <span className="font-bold text-lg">{naziv}</span>
                <span className="block text-gray-500 text-sm">Lokacija: {lokacija}</span>
                <span className="block text-gray-500 text-sm">Datum: {datum}</span>
                <span className="block text-gray-500 text-sm">Vrijeme: {vrijeme}</span>
                <span className="block text-gray-500 text-sm">Slobodno: {brojSlobodnihMjesta}</span>
            </div>
            <div className="badge bg-blue-500 text-white p-2 rounded">
                <span>{sport}</span>
            </div>
        </div>
    );
}

export default Card;
