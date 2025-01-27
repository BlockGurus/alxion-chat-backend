import express, { Request, Response } from "express";
import { getRetweeters, getLikingUsers } from "../services/tweets.services";
import { getTweets, saveRetweeters } from "../controllers/tweets.controllers";
import logger from "../config/logger";
import { extractMessageFrom429 } from "../utils";
import redis from "../services/redis.services"; // Adjust path as needed
const tweetRoutes = express.Router();
tweetRoutes.get("/", getTweets);

/**
 * Route to get retweeters of a tweet.
 */
tweetRoutes.get("/:id/retweeters", async (req: Request, res: Response) => {
  try {
    const tweetId = req.params.id;
    const cacheKey = `retweeters-${tweetId}`;
    const cachedData = await redis.get(cacheKey);
    let data: any = {};

    if (cachedData) {
      data = JSON.parse(cachedData);
    } else {
      data = await getRetweeters(tweetId);
      await redis.set(cacheKey, JSON.stringify(data), "EX", 900);
    }

    res.status(200).json(data);
  } catch (error: any) {
    logger.error(error.message);
    let { message } = extractMessageFrom429(
      error,
      "Failed to fetch retweeters"
    );
    res.status(500).json({ error: message });
  }
});

/**
 * Route to get users who liked a tweet.
 */
tweetRoutes.get("/:id/liking-users", async (req: Request, res: Response) => {
  try {
    const tweetId = req.params.id;
    const cacheKey = `liking-users-${tweetId}`;
    const cachedData = await redis.get(cacheKey);

    let data: any = {};

    if (cachedData) {
      data = JSON.parse(cachedData);
    } else {
      data = await getLikingUsers(tweetId);
      await redis.set(cacheKey, JSON.stringify(data), "EX", 900);
    }

    await redis.set(cacheKey, JSON.stringify(data), "EX", 900);
    res.status(200).json(data);
  } catch (error: any) {
    logger.error(error.message);
    console.log(error);
    let { message } = extractMessageFrom429(
      error,
      "Failed to fetch liking users."
    );
    res.status(500).json({
      error: message,
    });
  }
});

export default tweetRoutes;
