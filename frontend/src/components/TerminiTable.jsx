import React, { useEffect, useState } from 'react';

const TerminiTable = ({ token }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:8000/reservations/user", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          console.error('Failed to fetch reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [token]);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== id));
      } else {
        console.error('Failed to delete the reservation');
      }
    } catch (error) {
      console.error('Error deleting the reservation:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Appointment ID</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Number of Players</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="border px-4 py-2">{reservation.id}</td>
              <td className="border px-4 py-2">{reservation.appointment_id}</td>
              <td className="border px-4 py-2">{reservation.user_id}</td>
              <td className="border px-4 py-2">{reservation.number_of_players}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRemove(reservation.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TerminiTable;
