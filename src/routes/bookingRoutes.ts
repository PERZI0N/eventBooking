import { Router } from "express";
import {
  bookTickets,
  cancelBooking,
  printTicket,
} from "../controllers/bookingController";

const router = Router();

router.post("/bookings", bookTickets);
router.delete("/bookings/:id", cancelBooking);
router.post("/bookings/print-ticket", printTicket);

export default router;
