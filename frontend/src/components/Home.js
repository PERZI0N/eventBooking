import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/bookings/${email}` // Update endpoint as per your backend
      );
      const userId = response.data.data.user._id;
      navigate(`/user/${userId}/bookings`);
    } catch (error) {
      console.error("Error finding user:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-primary h-[100vh] text-fourth gap-[2rem]">
      <h1 className="font-bold text-3xl">
        Welcome to the Event Booking Management System
      </h1>
      <div className="mt-12 flex gap-[2rem]">
        <button className="bg-third p-2 rounded-full hover:bg-second hover:text-white transition-colors duration-300">
          <a href="/allEvents">All Events</a>
        </button>
      </div>
      <div>
        <h1 className="text-[3rem] mb-8">Enter Your Email</h1>
        <form
          className="bg-second p-6 rounded-xl shadow-lg w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full text-primary p-2 rounded"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="bg-primary text-fourth py-2 px-4 rounded-lg hover:bg-fourth hover:text-primary transition-colors"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
