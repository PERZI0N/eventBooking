import { Router } from "express";
import { createUser, findBookingsByEmail, getAllUsers, getUserById, getUserByIdAndBookings } from "../controllers/userController"

const router = Router();

router.post("/users", createUser);
router.get("/users", getAllUsers)
router.get("/users/:id", getUserById);
router.get("/users/email/:email", findBookingsByEmail);
router.get("/users/:userId/bookings", getUserByIdAndBookings);
export default router;
