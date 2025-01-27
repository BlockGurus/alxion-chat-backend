import express, { Request, Response } from "express";
import { getRetweeters, getLikingUsers } from "../services/tweets.services";
import { getTweets, saveRetweeters } from "../controllers/tweets.controllers";
import logger from "../config/logger";
import { extractMessageFrom429 } from "../utils";
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
    let { message, isLimitError } = extractMessageFrom429(
      error,
      "Failed to fetch retweeters"
    );
    if (isLimitError) {
      // fetch saved response
    }
    res.status(500).json({ error: message });
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
    console.log(error);
    let { message, isLimitError } = extractMessageFrom429(
      error,
      "Failed to fetch liking users."
    );
    if (isLimitError) {
      // fetch saved response
    }
    res.status(500).json({
      error: message,
    });
  }
});

export default tweetRoutes;
