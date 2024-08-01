import UserModel from "../models/User";
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
