import axios from "axios";

const API_URL = "https://event-booking-nap-queens-frontend.vercel.app"; // Replace with your API base URL

export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    console.log("API response:", response.data); // Log the API response
    return response.data.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
