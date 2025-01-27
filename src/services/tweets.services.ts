import { TweetSchemaModel } from "../models/tweets";
import axios from "axios";
import dotenv from "dotenv";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

dotenv.config();

const oauth = new OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY!, // Replace with your Twitter API Key
    secret: process.env.TWITTER_CONSUMER_SECRET!, // Replace with your Twitter API Secret Key
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

const processOauth = (url: string) => {
  // Prepare the request with OAuth headers
  const request_data = {
    url,
    method: "GET",
    data: {},
  };

  const headers = oauth.toHeader(
    oauth.authorize(request_data, {
      key: process.env.TWITTER_ACCESS_TOKEN!,
      secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    })
  );
  return headers;
};
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
  const headers = processOauth(url) as any;
  const response = await axios.get(url, {
    headers,
  });
  return response.data;
};
