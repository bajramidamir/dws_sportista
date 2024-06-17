import React, { useEffect, useState } from 'react';

const TerminiTable = ({ token }) => {
  const [appointments, setAppointments] = useState([]);
  const [reservation, setReservations] = useState([]);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:8000/appointments-all", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error('Failed to fetch reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchAppointments();
  }, [token]);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/appointments/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAppointments((prevReservations) => prevReservations.filter((reservation) => reservation.id !== id));
      } else {
        console.error('Failed to delete the reservation');
      }
    } catch (error) {
      console.error('Error deleting the reservation:', error);
    }
  };
//funkcija za formatiranje datuma
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2"> Početak</th>
            <th className="px-4 py-2">Kraj</th>
             <th className="px-4 py-2">Sport</th>
            <th className="px-4 py-2">Broj slobodnih</th>

            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="border px-4 py-2">{appointment.id}</td>
              <td className="border px-4 py-2">{appointment.start_time}</td>
              <td className="border px-4 py-2">{appointment.end_time}</td>
              <td className="border px-4 py-2">{appointment.sport}</td>
              <td className="border px-4 py-2">{appointment.available_slots}</td>

              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRemove(appointment.id)}
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
