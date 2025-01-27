import { getAllTweets } from "../services/tweets.services";
import { Request, Response } from "express";
export const getTweets = async (_: Request, res: Response) => {
  const tweets = await getAllTweets();
  res.json(tweets);
};
