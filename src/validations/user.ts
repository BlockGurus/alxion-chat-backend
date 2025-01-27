import Joi from "joi";
export const createTweetsSchema = Joi.object({
  text: Joi.string().required(),
  id: Joi.string().required(),
  edit_history_tweet_ids: Joi.array<string>().required(),
});
