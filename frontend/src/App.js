import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./styles.css";
import AllEvents from "./pages/AllEvents";
import UserBooking from "./pages/UserBooking";
import BookingForm from "./pages/BookingForm";
import Confirmation from "./components/Confirmation";



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allEvents" element={<AllEvents />} />
          <Route path="/yourBooking/:userId" element={<UserBooking />} />
          <Route path="/bookings/:eventId" element={<BookingForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/user/:userId/bookings" element={<UserBooking />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
