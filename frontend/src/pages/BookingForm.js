import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BookingForm = () => {
  const { eventId } = useParams(); //fetching the EventId from the parameters in the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    tickets: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://event-booking-nap-queens.vercel.app/bookings",
        {
          ...formData,
          eventId,
        }
      );
      console.log("Booking response:", response.data);
      navigate("/confirmation"); // Navigate to a confirmation page or wherever you want
    } catch (error) {
      console.error("Error booking tickets:", error);
    }
  };

  return (
    <div className="bg-primary h-screen flex flex-col items-center text-fourth p-4">
      <h1 className="text-[3rem] mb-8">Book Tickets</h1>
      <form
        className="bg-second p-6 rounded-xl shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full text-black p-2 rounded"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full text-black p-2 rounded"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className="w-full text-black p-2 rounded"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block  text-lg mb-2" htmlFor="tickets">
            Number of Tickets
          </label>
          <input
            className="w-full text-black p-2 rounded"
            type="number"
            id="tickets"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
            min="1"
            max="15"
            required
          />
        </div>
        <button
          className="bg-primary text-fourth py-2 px-4 rounded-lg hover:bg-fourth hover:text-primary transition-colors"
          type="submit"
        >
          Book Tickets
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
