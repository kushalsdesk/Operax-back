import express, { Router } from "express";
import {
  getSeries,
  createSeries,
  getSeriesByName,
} from "../controllers/series.controller";
import bodyParser from "body-parser";

const router: Router = express.Router();

router.get("/series", getSeries);
router.get("/series/:title", bodyParser.json(), getSeriesByName);
router.post("/series", createSeries);

export default router;
