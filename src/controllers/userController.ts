import UserModel from "../models/User";
import BookingModel from "../models/Booking";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const newUser = new UserModel({ name, email, phoneNumber });
    await newUser.save();
    res
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error creating user", details: error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try{
    const users = await UserModel.find({})
    res.status(200).json({
      success: true,
      message: "All users retrieved successfully",
      details: users
    })
  } catch(error){
    res.status(500).json({
      success: false,
      message: "Failed in fetching all users", details:error
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching user", details: error });
  }
};

export const findBookingsByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  const decodedEmail = decodeURIComponent(email);
  try {
    const user = await UserModel.findOne({ email: decodedEmail });
    console.log(user);
    if (!user || user == null) {
      console.warn(`Warning: User with email ${decodedEmail} not found`);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const bookings = await BookingModel.find({ userId: user._id }).populate(
      "eventId"
    );
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: { user, bookings },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching bookings",
        details: error,
      });
  }
};

export const getUserByIdAndBookings = async (req: Request, res: Response) => {
  const {userId} = req.params;
  try{
    const user = await UserModel.findById(userId);
    if(!user){
      return res.status(404).json({success: false, message: "User not found"});
    }
    const bookings = await BookingModel.find({userId: user._id}).populate("eventId");
    res.status(200).json({
      success: true,
      message: "All bookings found successfully",
      data: {user, bookings}
    })
  } catch( error){
    console.error("Error in fetching the details")
    res.status(500).json({
      success: false,
      message: "some error occured",
      details: error,
    })
  }
}