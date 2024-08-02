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
      console.log(email);
      const encodedEmail = encodeURIComponent(email);
      const response = await axios.get(
        `https://event-booking-nap-queens.vercel.app/users/email/${encodedEmail}` // Updated endpoint
      );
      if (response.data.data == null) {
        window.alert("no such user found");
      }
      const userId = response.data.data.user._id;
      navigate(`/user/${userId}/bookings`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        window.alert("User not found");
      } else {
        console.error("Error finding user:", error);
        window.alert("An error occurred while fetching user data.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-primary h-[100vh] text-fourth gap-[2rem]">
      <h1 className="font-bold text-3xl">
        Welcome to the Event Booking Management System
      </h1>
      <div className="mt-12 flex gap-[2rem]">
        <button className="bg-second p-4 px-12 rounded-full hover:bg-third hover:text-white transition-colors duration-300">
          <a href="/allEvents">All Events</a>
        </button>
      </div>
      <div>
        <h1 className="text-[2rem] w-[50vh] flex justify-center mb-8">Enter Your Email</h1>
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
              placeholder="Example@something.com"
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
