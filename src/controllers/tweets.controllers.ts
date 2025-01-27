import { getAllTweets } from "../services/tweets.services";
import { Request, Response } from "express";
import RetweetersResponse from "../models/retweeters";
import { IRetweetersResponse } from "../interfaces/retweeters.interface";
export const getTweets = async (_: Request, res: Response) => {
  const tweets = await getAllTweets();
  res.json(tweets);
};

export const saveRetweeters = async (
  req: Request,
  _: Response,
  data: IRetweetersResponse
) => {
  const tweetId = req.params.id;

  await RetweetersResponse.updateOne(
    { tweetId },
    {
      tweetId,
      users: data.data,
      meta: data.meta,
    },
    { upsert: true }
  );
};
