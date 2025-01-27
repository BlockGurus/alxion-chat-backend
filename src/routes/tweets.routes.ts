import express from "express";
import { getTweets } from "../controllers/tweets.controllers.ts";
const router = express.Router();
router.get("/", getTweets);
export const tweetRoutes = router;
