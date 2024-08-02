import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const UserBookings = () => {
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}/bookings`
        );
        setUser(response.data.data.user);
        setBookings(response.data.data.bookings);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Error fetching bookings");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleClick = async () => {
    try {
      // Fetch the user's bookings
      const currUserResponse = await axios.get(
        `https://event-booking-nap-queens-frontend.vercel.app/users/${userId}/bookings`
      );

      // Extract bookings from the response
      const bookings = currUserResponse.data.data.bookings;

      // Check if there are bookings and extract the ID of the first booking (or specify the ID you want to delete)
      if (bookings.length > 0) {
        const bookingId = bookings[0]._id; // Example: delete the first booking; adjust as needed

        // Delete the booking
        await axios.delete(`https://event-booking-nap-queens-frontend.vercel.app/bookings/${bookingId}`);

        console.log("The booking has been deleted");
        navigate("/bookingDeleted");
      } else {
        console.log("No bookings found to delete.");
        window.alert("No booking found")
      }
    } catch (error) {
      console.log("Some error occurred: ", error);
    }
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center bg-primary h-[100vh] text-fourth gap-[2rem]">
      <h1 className="font-bold mt-12 text-3xl">Bookings for {user.name}</h1>
      <div className="mt-12 flex flex-col gap-[2rem]">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-second px-[10rem] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-lg font-bold">{booking.eventId.name}</h2>
              <p>Date: {new Date(booking.eventId.date).toLocaleDateString()}</p>
              {/* <p>Location: {booking.eventId.location}</p> */}
              <p>Tickets: {booking.tickets}</p>
              <button onClick={() => {handleClick()}} className="bg-primary mt-6 text-fourth py-2 px-4 rounded-lg hover:bg-fourth hover:text-primary transition-colors">
                Delete Booking
              </button>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
