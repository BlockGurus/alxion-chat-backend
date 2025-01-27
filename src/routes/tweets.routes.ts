import express, { Request, Response } from "express";
import { getRetweeters, getLikingUsers } from "../services/tweets.services";
import { getTweets, saveRetweeters } from "../controllers/tweets.controllers";
import logger from "../config/logger";
const tweetRoutes = express.Router();
tweetRoutes.get("/", getTweets);

/**
 * Route to get retweeters of a tweet.
 */
tweetRoutes.get("/:id/retweeters", async (req: Request, res: Response) => {
  try {
    const tweetId = req.params.id;
    const data = await getRetweeters(tweetId);
    await saveRetweeters(req, res, data);
    res.status(200).json(data);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ error: "Failed to fetch retweeters." });
  }
});

/**
 * Route to get users who liked a tweet.
 */
tweetRoutes.get("/:id/liking-users", async (req: Request, res: Response) => {
  try {
    const tweetId = req.params.id;
    const data = await getLikingUsers(tweetId);
    res.status(200).json(data);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ error: "Failed to fetch liking users." });
  }
});

export default tweetRoutes;
