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

export const createGames = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      genre,
      platform,
      releaseYear,
      developer,
      publisher,
      description,
      rating,
      tagString,
      seriesName,
    } = req.body;
  } catch (err) {
    console.log("Error while creating games", err.message);
  }
};
