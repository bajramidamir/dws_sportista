import React, { useState, useEffect } from 'react';

const ManagerRequestTable = () => {
  const [userFields, setUserFields] = useState([]);


  useEffect(() => {
    const fetchUserFields = async () => {
      try {
        const response = await fetch('http://localhost:8000/manager-applications');
        if (response.ok) {
          const data = await response.json();
          setUserFields(data);
        } else {
          console.error('Failed to fetch user fields');
        }
      } catch (error) {
        console.error('Error fetching user fields:', error);
      }
    };

    fetchUserFields();
  }, []);

  const handleApprove = async (id) => {
    // Implement the logic for approving a request here
  };

  const handleReject = async (id) => {
    // Implement the logic for rejecting a request here
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
            <th className="px-4 py-2">ID korisnika</th>
            <th className="px-4 py-2">Ime</th>
            <th className="px-4 py-2">Prezime</th>
            <th className="px-4 py-2">Datum prijave</th>
            <th className="px-4 py-2">Razlog</th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>

          </tr>
        </thead>
        <tbody>
          {userFields.map(userField => (
             <tr key={userField.user_id}>
             <td className="border px-4 py-2">{userField.user_id}</td>
             <td className="border px-4 py-2">{userField.first_name}</td>
             <td className="border px-4 py-2">{userField.last_name}</td>
             <td className="border px-4 py-2">{formatDate(userField.request_date)}</td>
             <td className="border px-4 py-2">{userField.reason}</td>
             <td className="border px-4 py-2">
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleApprove(userField.user_id)}
                >
                  Prihvati
                </button>
              </td>
              <td className="border px-4 py-2">
              <button 
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleReject(userField.user_id)}
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
