import Joi from "joi";
export const createTweetsSchema = Joi.object({
  text: Joi.string().required(),
  id: Joi.string().required(),
  edit_history_tweet_ids: Joi.array<string>().required(),
});

export const validateTweet = (req, res, next) => {
  const { error } = createTweetsSchema.validate(req.body);
  if (error) {
    error.isJoi = true; // Mark this as a Joi validation error
    return next(error);
  }
  next();
};
