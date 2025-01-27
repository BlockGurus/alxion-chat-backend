import mongoose, { Schema, Document } from "mongoose";
import { IRetweetersResponse } from "../interfaces/retweeters.interface";

interface IRetweetResponse extends Document, IRetweetersResponse {}

const RetweetersResponseSchema: Schema = new Schema(
  {
    tweetId: { type: String, required: true },
    data: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        username: { type: String, required: true },
      },
    ],
    meta: {
      resultCount: { type: Number, required: true },
      nextToken: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const RetweetersResponse = mongoose.model<IRetweetResponse>(
  "RetweetersResponse",
  RetweetersResponseSchema
);

export default RetweetersResponse;
