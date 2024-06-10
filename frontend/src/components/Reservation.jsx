import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Card from "./Card";

function Reservation() {
    const { courtId } = useParams(); // Ensure this is at the top
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [terms, setTerms] = useState([]);
    const [formData, setFormData] = useState({
        start_time: "",
        number_of_players: ""
    });
    const { isLoggedIn, userData } = useContext(AuthContext);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [idTermina, setIdTermina] = useState("");
    const [vrijemeTermina, setVrijemeTermina] = useState("");

    // Fetch selected court data
    const fetchSelectedCourt = async () => {
        try {
            const response = await fetch(`http://localhost:8000/courts/${courtId}`);
            if (response.ok) {
                const data = await response.json();
                setSelectedCourt(data);
            } else {
                console.error("Failed to fetch selected court");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch terms for the selected court
    const fetchTerms = async () => {
        try {
            const response = await fetch(`http://localhost:8000/appointments/${courtId}`);
            if (response.ok) {
                const data = await response.json();
                setTerms(data);
            } else {
                console.error("Failed to fetch terms");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSelectedCourt();
        fetchTerms();
    }, [courtId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReserveClick = (id, vrijeme) => {
        setSelectedTerm({ id });
        setIdTermina(id);
        setVrijemeTermina(vrijeme);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/reservations/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    appointment_id: selectedTerm.id,
                    user_id: userData.id,
                    number_of_players: formData.number_of_players
                })
            });
            if (response.ok) {
                console.log("Reservation successful");
                // TO DO
            } else {
                console.error("Failed to make reservation");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-16 py-6 bg-gray-100 md:col-span-2">
            <div className="flex justify-center sm:justify-center md:justify-end">
                <Link to="/login" className="text-primary btn border md:border-2 hover:bg-gray-400 hover:text-white">Login</Link>
                <Link to="/signup" className="text-primary ml-2 btn border md:border-2 hover:bg-gray-400 hover:text-white">Sign up</Link>
            </div>
            <main className="flex flex-col items-start justify-start flex-2">
                <h5 className="text-2xl font-semibold mb-6 mt-5 border-b-2">Rezervacija</h5>
                <div className="mb-10 w-full">
                    {selectedCourt && (
                        <Card
                            key={selectedCourt.id}
                            name={selectedCourt.name}
                            location={selectedCourt.city}
                            sport={selectedCourt.sports.join(", ")}
                            imageLink={selectedCourt.image_link}
                            courtType={selectedCourt.court_type}
                        />
                    )}
                </div>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID termina</th>
                            <th className="px-4 py-2">Početak termina</th>
                            <th className="px-4 py-2">Kraj termina</th>
                            <th className="px-4 py-2">Sport</th>
                            <th className="px-4 py-2">Broj slobodnih mjesta</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {terms.map(term => (
                            <tr key={term.id}>
                                <td className="border px-4 py-2">{term.id}</td>
                                <td className="border px-4 py-2">{term.start_time}</td>
                                <td className="border px-4 py-2">{term.end_time}</td>
                                <td className="border px-4 py-2">{term.sport}</td>
                                <td className="border px-4 py-2">{term.available_slots}</td>
                                <td className="border px-4 py-2">
                                    <button className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleReserveClick(term.id, term.start_time)}>
                                        Rezerviši
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <form className="w-full max-w-lg mt-10" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="appointment_id" className="block text-gray-700 text-sm font-bold mb-2">
                            ID termina
                        </label>
                        <input
                            type="text"
                            id="appointment_id"
                            name="appointment_id"
                            value={selectedTerm ? selectedTerm.id : ""}
                            readOnly 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="ID termina"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="start_time" className="block text-gray-700 text-sm font-bold mb-2">
                            Početak termina
                        </label>
                        <input
                            type="text"
                            id="start_time"
                            name="start_time"
                            value={vrijemeTermina}
                            readOnly 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Vrijeme termina"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="number_of_players" className="block text-gray-700 text-sm font-bold mb-2">
                            Broj igrača
                        </label>
                        <input
                            type="text"
                            id="number_of_players"
                            name="number_of_players"
                            value={formData.number_of_players}
                            onChange={handleChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Broj igrača"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Potvrdi
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Reservation;
