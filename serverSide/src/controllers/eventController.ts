import EventModel from "../models/Event";
import { Request, Response } from "express";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = new EventModel(req.body);
    await newEvent.save();
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating event",
      details: error,
    });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await EventModel.find({});
    res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving events",
      details: error,
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({
      success: true,
      message: "Event retrieved successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving event",
      details: error,
    });
  }
};
