import React, { useEffect, useState } from "react";
import { getEvents } from "../api/api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await getEvents();
        console.log("Fetched events:", eventData); // Log the fetched data

        if (Array.isArray(eventData)) {
          setEvents(eventData);
        } else {
          console.error("Fetched data is not an array:", eventData);
          setError("Fetched data is not an array");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return <div className="text-[3xl] animate-bounce"><Loading /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-primary h-screen flex flex-col items-center text-fourth p-4">
      <h1 className="text-[3rem] mb-8 animate-fade-in">Events</h1>
      <ul className="w-full max-w-4xl space-y-6">
        {events.map((event) => (
          <li
            key={event._id}
            className="bg-second rounded-xl p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl animate-fade-in-up"
          >
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
              <p className="text-lg mb-2">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-lg mb-4">
                Available Tickets: {event.totalTickets}
              </p>
              <button
                className="bg-primary text-fourth py-2 px-4 rounded-lg hover:bg-fourth hover:text-primary transition-colors"
                onClick={() => navigate(`/bookings/${event._id}`)}
              >
                Book Tickets
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllEvents;
