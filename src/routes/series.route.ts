import express, { Router } from "express";
import {
  getSeries,
  createSeries,
  getSeriesByName,
  getGamesBySeriesId,
} from "../controllers/series.controller";

const router: Router = express.Router();

router.get("/series", getSeries);
router.get("/series/:seriesId", getGamesBySeriesId);
router.get("/seriesName/:title", getSeriesByName);
router.post("/series", createSeries);

export default router;
