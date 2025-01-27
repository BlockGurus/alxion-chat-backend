import express from "express";
import { getTweets } from "../controllers/tweets.controllers";
const router = express.Router();
router.get("/", getTweets);
export const tweetRoutes = router;
