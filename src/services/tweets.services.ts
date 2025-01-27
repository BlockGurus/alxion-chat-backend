import { TweetSchemaModel } from "../models/tweets";
export const getAllTweets = async () => await TweetSchemaModel.find();
