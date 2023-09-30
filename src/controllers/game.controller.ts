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
): Promise<Response> => {
  try {
    let {
      title,
      genre,
      platform,
      releaseYear,
      developer,
      publisher,
      description,
      rating,
      tags,
      seriesName,
      imageUrl,
    } = req.body;
    if (req.file) {
      const file = req.file;
      imageUrl = await upload_Img(file, title, seriesName);
    }

    const seriesId = await Series.findOne({ title: seriesName }, { _id: 1 });
    if (!seriesId) {
      return res.status(400).send({ message: "Series not found" });
    }

    const tagsString = tags;
    const tagArray = tagsString.split(",").map((tag: string) => tag.trim());

    const newGame = new Game({
      title,
      genre,
      platform,
      releaseYear,
      developer,
      publisher,
      description,
      rating,
      imageUrl,
      tagArray,
      seriesId,
    });

    const savedGame: IGame = await newGame.save();

    await Series.findByIdAndUpdate(
      seriesId,
      { $push: { games: savedGame._id } },
      { new: true }
    );
    return res.status(201).send(savedGame);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
      error: "Some Internal Error",
    });
  }
};
