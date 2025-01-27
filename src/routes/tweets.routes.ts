import express, { Request, Response } from "express";
import { getRetweeters, getLikingUsers } from "../services/tweets.services";
import { getTweets, saveRetweeters } from "../controllers/tweets.controllers";
import logger from "../config/logger";
import { getRateLimitResetTime } from "../utils";
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
    let message = extractMessageFrom429(error, "Failed to fetch retweeters");
    res.status(500).json({ error: message });
  }
});

const extractMessageFrom429 = (error: any, defaultMessage: string) => {
  if (error.response && error.response.status === 429) {
    // If the status is 429 (Rate Limit Exceeded)
    const resetTimestamp = error.response.headers["x-rate-limit-reset"];

    // Calculate remaining time to reset the rate limit
    const remainingTime = getRateLimitResetTime(parseInt(resetTimestamp));
    const message = `Rate limit exceeded. Try again in ${remainingTime} seconds.`;
    logger.info(message);
    return message;
  }
};

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
    let message = extractMessageFrom429(error, "Failed to fetch liking users.");
    res.status(500).json({
      error: message,
    });
  }
});

export default tweetRoutes;
