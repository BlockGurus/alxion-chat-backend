import { TweetSchemaModel } from "../models/tweets";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getAllTweets = async () => await TweetSchemaModel.find();

const BASE_URL = "https://api.twitter.com/2/tweets";

/**
 * Get users who retweeted a tweet.
 * @param tweetId - The ID of the tweet.
 */
export const getRetweeters = async (tweetId: string) => {
  const url = `${BASE_URL}/${tweetId}/retweeted_by`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  });
  return response.data;
};

/**
 * Get users who liked a tweet.
 * @param tweetId - The ID of the tweet.
 */
export const getLikingUsers = async (tweetId: string) => {
  const url = `${BASE_URL}/${tweetId}/liking_users`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  });
  return response.data;
};
