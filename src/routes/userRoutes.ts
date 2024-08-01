import { Router } from "express";
import { createUser, findBookingsByEmail, getAllUsers, getUserById } from "../controllers/userController"

const router = Router();

router.post("/users", createUser);
router.get("/users", getAllUsers)
router.get("/users/:id", getUserById);
router.get("/bookings/:email", findBookingsByEmail);
export default router;
