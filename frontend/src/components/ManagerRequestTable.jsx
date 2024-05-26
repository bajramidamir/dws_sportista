import React, { useState, useEffect } from 'react';

const ManagerRequestTable = () => {
  const [userFields, setUserFields] = useState([]);

  useEffect(() => {
    // cisto radi prikaza ubaceni bezveze podaci
    const fetchedUserFields = [
      { id: 1, firstName: 'John', lastName: 'Doe', fieldName: 'Football Field' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', fieldName: 'Tennis Court' },
      { id: 3, firstName: 'Mike', lastName: 'Johnson', fieldName: 'Basketball Court' },
    ];
    setUserFields(fetchedUserFields);
  }, []);

  const handleApprove = (id) => {
   
  };

  const handleReject = (id) => {
  
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID korisnika</th>
            <th className="px-4 py-2">Ime</th>
            <th className="px-4 py-2">Prezime</th>
            <th className="px-4 py-2">Naziv terena</th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>

          </tr>
        </thead>
        <tbody>
          {userFields.map(userField => (
            <tr key={userField.id}>
              <td className="border px-4 py-2">{userField.id}</td>
              <td className="border px-4 py-2">{userField.firstName}</td>
              <td className="border px-4 py-2">{userField.lastName}</td>
              <td className="border px-4 py-2">{userField.fieldName}</td>
              <td className="border px-4 py-2">
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleApprove(userField.id)}
                >
                  Odobri
                </button>
              </td>
              <td className="border px-4 py-2">
              <button 
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleReject(userField.id)}
                >
                  Odbij
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerRequestTable;
