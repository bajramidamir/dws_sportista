import React, { useState, useEffect } from 'react';

const ManagersTable = () => {
  const [managers, setManagers] = useState([]);

  const fetchManagers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users/managers");
      if (response.ok) {
        const data = await response.json();
       setManagers(data); 
      } else {
        console.error("Failed to fetch basketball appointments");
        return []; 
      }
    } catch (error) {
      console.error("Error fetching basketball appointments:", error);
      return []; 
    }
}

  useEffect(() => {
    fetchManagers();
  }, []);
  
  // const handleRemove = (id) => {
   
  //   setManagers(managers.filter(manager => manager.id !== id));
  // };

  return (
    <div className="overflow-x-auto">

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID menadžera</th>
            <th className="px-4 py-2">Ime</th>
            <th className="px-4 py-2">Prezime</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {managers.map(manager => (
            <tr key={manager.id}>
              <td className="border px-4 py-2">{manager.id}</td>
              <td className="border px-4 py-2">{manager.first_name}</td>
              <td className="border px-4 py-2">{manager.last_name}</td>
              <td className="border px-4 py-2">{manager.email}</td>
              <td className="border px-4 py-2">
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded"
                 
                >
                  Ukloni
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagersTable;
