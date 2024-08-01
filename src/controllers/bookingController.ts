import BookingModel from "../models/Booking";
import UserModel from "../models/User";
import EventModel from "../models/Event";
import { Request, Response } from "express";

export const bookTickets = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, userId, eventId, tickets } = req.body;
  //checking if the user exists or not
  let user = await UserModel.findOne({ email });

  if (!user) {
    user = new UserModel({ name, email, phoneNumber });
    await user.save();
  }

  if (tickets > 15) {
    return res.status(400).json({
      success: false,
      message: "Cannot book more than 15 tickets per request.",
    });
  }

  try {
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found." });
    }

    if (event.totalTickets < tickets) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough tickets available." });
    }

    const newBooking = new BookingModel({ userId: user._id, eventId, tickets });
    await newBooking.save();
    // Update the total number of tickets available for the event
    event.totalTickets -= tickets;
    await event.save();

    res
      .status(201)
      .json({ success: true, message: "Booking successful", data: newBooking });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error booking tickets",
      details: error,
    });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await BookingModel.findById(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    const event = await EventModel.findById(booking.eventId);
    if (event) {
      event.totalTickets += booking.tickets;
      await event.save();
    }

    await BookingModel.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling booking",
      details: error,
    });
  }
};

export const printTicket = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;
    const booking = await BookingModel.findById(bookingId).exec();
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    const event = await EventModel.findById(booking.eventId).exec();
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event associated with this booking not found",
      });
    }

    const user = await UserModel.findById(booking.userId).exec();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const ticketInfo = {
      eventName: event.name,
      eventDate: event.date,
      userName: user.name,
      userEmail: user.email,
      userPhoneNumber: user.phoneNumber,
      numberOfTickets: booking.tickets,
      bookingDate: booking.timestamp,
    };

    res.status(200).json({
      success: true,
      message: "Ticket generated successfully",
      ticketInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error printing ticket",
      details: error,
    });
  }
};
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await BookingModel.find().populate("eventId", "name date");
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      details: error,
    });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await BookingModel.findById(req.params.id).populate(
      "eventId",
      "name date"
    );
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      details: error,
    });
  }
};
