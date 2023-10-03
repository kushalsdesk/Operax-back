import express, { Router } from "express";
import { createUser } from "../controllers/user.controller";

const router: Router = express.Router();

router.post("/user", createUser);

export default router;
