import express, { Router } from "express";
import { getGames, createGames } from "../controllers/game.controller";

import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, //10MB limit
  },
});

const router: Router = express.Router();

//route for getting the games
router.get("/games", getGames);
//route for creating games
router.post("/game", [upload.single("image")], createGames);

export default router;
