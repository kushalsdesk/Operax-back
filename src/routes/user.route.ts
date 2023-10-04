import express, { Router } from "express";
import { createUser, getUserByEmail } from "../controllers/user.controller";

const router: Router = express.Router();

router.post("/user", createUser);
router.get("/user/:email", getUserByEmail);

export default router;
