import tweetService from "../services/tweets.services.ts";
export const getTweets = async (req, res) => {
  const users = await tweetService.getAllTweets();
  res.json(users);
};
