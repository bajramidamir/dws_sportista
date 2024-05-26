import React, { useState } from "react";

function DodajTerminForm() {
  const [formData, setFormData] = useState({
    dvorana: "",
    lokacija: "",
    kapacitet: "",
    sport: "",
    fitness_level: "",
  });

  const handleChange = (e) => {
   
  };

  const handleSubmit = (e) => {
   
  };

  return (
    <div className="">
      <main className="flex flex-col items-start justify-start flex-1">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6 w-full">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="dvorana"
              >
                Dvorana
              </label>
              <input
                type="text"
                id="dvorana"
                name="dvorana"
                value={formData.dvorana}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Naziv dvorane"
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="lokacija"
              >
                Lokacija
              </label>
              <input
                type="text"
                id="lokacija"
                name="lokacija"
                value={formData.lokacija}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Lokacija"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="kapacitet"
              >
                Kapacitet
              </label>
              <input
                type="number"
                id="kapacitet"
                name="kapacitet"
                min="0"
                value={formData.kapacitet}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Kapacitet"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="sport"
              >
                Sport
              </label>
              <input
                type="text"
                id="sport"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Sport"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="levelSportinesaa"
              >
                Fitness level
              </label>
              <input
                type="text"
                id="levelSportinesaa"
                name="levelSportinesaa"
                value={formData.fitness_level}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Level sportinesaa"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mt-3">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default DodajTerminForm;
