import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
} from "../controllers/eventController";

const router = Router();

router.post("/events", createEvent);
router.get("/events", getEvents);
router.get("/events/:id", getEventById);

export default router;
