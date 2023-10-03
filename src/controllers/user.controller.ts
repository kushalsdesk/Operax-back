import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import Games from "../models/game.model";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let { email, displayName, photoURL } = req.body;

    const userExists = await User.findOne({ email }).exec();
    if (userExists) {
      return res.status(200).send({
        success: true,
        message: "User already exists, Logged In Success",
        photoUrl: userExists.photoURL,
      });
    }

    const newUser = new User({
      email,
      displayName,
      photoURL,
    });
    const savedUser: IUser = await newUser.save();

    return res.status(201).send({
      success: true,
      message: "User saved successfully",
      photoUrl: savedUser.photoURL,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: " Some Internal Error while creating user",
    });
  }
};
