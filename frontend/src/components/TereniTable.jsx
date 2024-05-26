import React, { useState, useEffect } from 'react';

const TereniTable = () => {
  const [tereni, setTereni] = useState([]);

  useEffect(() => {
    const fetchedTereni = [
      { id: 1, naziv: 'Sportski teren 1', imeVlasnika: 'Marko', prezimeVlasnika: 'Marković', tip: 'Otvoreni', },
      { id: 2, naziv: 'Sportski teren 2', imeVlasnika: 'Ana', prezimeVlasnika: 'Anić', tip: 'Otvoreni', },
      { id: 3, naziv: 'Sportski teren 3', imeVlasnika: 'Ivan', prezimeVlasnika: 'Ivanić', tip: 'Zatvoreni', },
    ];
    setTereni(fetchedTereni);
  }, []);

  const handleRemove = (id) => {
    setTereni(tereni.filter(teren => teren.id !== id));
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">ID terena</th>
          <th className="px-4 py-2">Naziv terena</th>
          <th className="px-4 py-2">Ime vlasnika</th>
          <th className="px-4 py-2">Prezime vlasnika</th>
          <th className="px-4 py-2">Tip terena</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {tereni.map(teren => (
          <tr key={teren.id}>
            <td className="border px-4 py-2">{teren.id}</td>
            <td className="border px-4 py-2">{teren.naziv}</td>
            <td className="border px-4 py-2">{teren.imeVlasnika}</td>
            <td className="border px-4 py-2">{teren.prezimeVlasnika}</td>
            <td className="border px-4 py-2">{teren.tip}</td>
            <td className="border px-4 py-2">
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleRemove(teren.id)}
              >
                Otkaži
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TereniTable;
