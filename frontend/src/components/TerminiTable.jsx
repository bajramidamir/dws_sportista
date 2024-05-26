import React, { useState, useEffect } from 'react';

const TerminiTable = () => {
  const [termini, setTermini] = useState([]);

  useEffect(() => {
    const fetchedTermini = [
      { id: 1, idMenadzera: 101, nazivDvorane: 'Dvorana A', lokacija: 'Sarajevo', datum: '2024-05-27', sport: 'Fudbal', kapacitet: 10 },
      { id: 2, idMenadzera: 102, nazivDvorane: 'Dvorana B', lokacija: 'Zenica', datum: '2024-06-01', sport: 'Košarka', kapacitet: 15 },
      { id: 3, idMenadzera: 103, nazivDvorane: 'Dvorana C', lokacija: 'Mostar', datum: '2024-06-05', sport: 'Odbojka', kapacitet: 12 },
    ];
    setTermini(fetchedTermini);
  }, []);

  const handleRemove = (id) => {
    setTermini(termini.filter(termin => termin.id !== id));
  };

  return (
    <div className="overflow-x-auto">
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">ID termina</th>
          <th className="px-4 py-2">ID menadžera termina</th>
          <th className="px-4 py-2">Naziv dvorane</th>
          <th className="px-4 py-2">Lokacija</th>
          <th className="px-4 py-2">Datum</th>
          <th className="px-4 py-2">Sport</th>
          <th className="px-4 py-2">Kapacitet</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {termini.map(termin => (
          <tr key={termin.id}>
            <td className="border px-4 py-2">{termin.id}</td>
            <td className="border px-4 py-2">{termin.idMenadzera}</td>
            <td className="border px-4 py-2">{termin.nazivDvorane}</td>
            <td className="border px-4 py-2">{termin.lokacija}</td>
            <td className="border px-4 py-2">{termin.datum}</td>
            <td className="border px-4 py-2">{termin.sport}</td>
            <td className="border px-4 py-2">{termin.kapacitet}</td>
            <td className="border px-4 py-2">
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleRemove(termin.id)}
              >
                Otkaži
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
