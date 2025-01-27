import logger from "../config/logger";
export function setup_HandleError(error: unknown, context: string): void {
  if (error instanceof Error) {
    if (error.message.includes("net::ERR_ABORTED")) {
      logger.error(`ABORTION error occurred in ${context}: ${error.message}`);
    } else {
      logger.error(`Error in ${context}: ${error.message}`);
    }
  } else {
    logger.error(`An unknown error occurred in ${context}: ${error}`);
  }
}

export const getRateLimitResetTime = (resetTimestamp: number): number => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
  return resetTimestamp - currentTimestamp; // Time remaining in seconds
};

/**
 *
 * @param error
 * @param defaultMessage
 * @returns message extracted from the error or the default message
 */
export const extractMessageFrom429 = (error: any, defaultMessage: string) => {
  if (error.response && error.response.status === 429) {
    // If the status is 429 (Rate Limit Exceeded)
    const resetTimestamp = error.response.headers["x-rate-limit-reset"];

    // Calculate remaining time to reset the rate limit
    const remainingTime = getRateLimitResetTime(parseInt(resetTimestamp));
    const message = `Rate limit exceeded. Try again in ${remainingTime} seconds.`;
    logger.info(message);
    return message;
  }
  return defaultMessage;
};
