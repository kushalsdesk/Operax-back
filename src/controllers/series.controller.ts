import { Request, Response, NextFunction } from "express";
import Series, { ISeries } from "../models/series.model";
import Game from "../models/game.model";

//For getting each series

export const getSeries = async (req: Request, res: Response): Promise<void> => {
  try {
    const series: ISeries[] = await Series.find({}).exec();
    res.status(200).send({ success: true, message: "Series Found", series });
  } catch (err) {
    console.log("Error getting series", err.message);
  }
};

export const createSeries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { title } = req.body;
    const newSeries = new Series({ title });
    const savedSeries = await newSeries.save();

    return res.status(201).json(savedSeries);
  } catch (error) {
    console.log("Error while Creating the Series", error.message);
  }
};

export const getSeriesByName = async (req: Request, res: Response) => {
  try {
    const { title } = req.params;
    console.log(title);

    // Find the series by title in the MongoDB collection
    const series = await Series.findOne({ title }).exec();

    if (!series) {
      return res.status(404).json({
        success: false,
        message: "Series not found",
      });
    }

    // If series is found, send a JSON response
    res.status(200).json({
      success: true,
      message: "Series Found",
      series,
    });
  } catch (err) {
    console.error("Error while retrieving series", err.message);
    res.status(500).json({
      success: false,
      message: "Error while retrieving series",
    });
  }
};

export const getGamesBySeriesId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { seriesId } = req.params;
    const series = await Series.findById(seriesId).exec();

    if (!series) {
      return res.status(404).send({
        success: false,
        message: "Series not found",
      });
    }

    const gameIds = series.games;
    const games = await Game.find({ _id: { $in: gameIds } })
      .sort({ releaseYear: 1 })
      .exec();

    return res.status(200).send({
      success: true,
      message: "Games retrieved",
      seriesName: series.title,
      games,
    });
  } catch (err) {
    console.log("Error while retrieving games", err.message);
  }
};
