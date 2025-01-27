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
  res: Response,
  data: IRetweetersResponse
) => {
  const tweetId = req.params.id;
  new RetweetersResponse({
    tweetId,
    users: data.users,
    meta: data.meta,
  });
};
