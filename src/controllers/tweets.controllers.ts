import { getAllTweets } from "../services/tweets.services.ts";
export const getTweets = async (req, res) => {
  const tweets = await getAllTweets();
  res.json(tweets);
};
