import { Router } from "express";
import {
  bookTickets,
  cancelBooking,
  getAllBookings,
  getBookingById,
  printTicket,
} from "../controllers/bookingController";

const router = Router();

router.post("/bookings", bookTickets);
router.delete("/bookings/:id", cancelBooking);
router.post("/bookings/print-ticket", printTicket);
router.get("/bookings", getAllBookings);
router.get("/bookings/:id", getBookingById);


export default router;
