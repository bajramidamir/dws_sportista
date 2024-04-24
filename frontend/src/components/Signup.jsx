import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    fitness_level: "",
    preferred_sport: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    // Provjeravamo da li je odabrana opcija osim prve (prazne)
    if (value !== "") {
      // Pronalazimo opciju "Select sport" ili "Select fitness level" i sklanjamo je
      const selectElement = document.getElementById(name);
      const selectOption = selectElement.querySelector('option[value=""]');
      if (selectOption) {
        selectOption.remove();
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      if (response.ok) {
        // Handle successful response, e.g., show success message or redirect
      } else {
        // Handle error response, e.g., show error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first_name" className="block font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="username" className="block font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="city" className="block font-semibold">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="fitness_level" className="block font-semibold">
              Fitness Level
            </label>
            <select
              id="fitness_level"
              name="fitness_level"
              value={formData.fitness_level}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option value="">Select fitness level</option>
              <option value="amateur">Amateur</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          <div>
            <label htmlFor="preferred_sport" className="block font-semibold">
              Preferred Sport
            </label>
            <select
              id="preferred_sport"
              name="preferred_sport"
              value={formData.preferred_sport}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option value="">Select sport</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="volleyball">Volleyball</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
