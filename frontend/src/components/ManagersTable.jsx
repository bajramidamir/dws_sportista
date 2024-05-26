import React, { useState, useEffect } from 'react';

const ManagersTable = () => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
  
    const fetchedManagers = [
      { id: 1, firstName: 'John', lastName: 'Doe', numberOfFields: 3 },
      { id: 2, firstName: 'Jane', lastName: 'Smith', numberOfFields: 5 },
      { id: 3, firstName: 'Mike', lastName: 'Johnson', numberOfFields: 2 },
    ];
    setManagers(fetchedManagers);
  }, []);

  const handleRemove = (id) => {
   
    setManagers(managers.filter(manager => manager.id !== id));
  };

  return (
    <div className="overflow-x-auto">

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID menadžera</th>
            <th className="px-4 py-2">Ime</th>
            <th className="px-4 py-2">Prezime</th>
            <th className="px-4 py-2">Broj prijavljenih terena</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {managers.map(manager => (
            <tr key={manager.id}>
              <td className="border px-4 py-2">{manager.id}</td>
              <td className="border px-4 py-2">{manager.firstName}</td>
              <td className="border px-4 py-2">{manager.lastName}</td>
              <td className="border px-4 py-2">{manager.numberOfFields}</td>
              <td className="border px-4 py-2">
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRemove(manager.id)}
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
