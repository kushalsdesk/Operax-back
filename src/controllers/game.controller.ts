import { Request, Response, NextFunction } from "express";
import Game, { IGame } from "../models/game.model";
import Series from "../models/series.model";
import { upload_Img } from "../services/firebase.service";

export const getGames = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const games: IGame[] = await Game.find({}).exec();
    res.status(200).json(games);
  } catch (err) {
    console.log("Error while retrieving games", err.message);
  }
};
