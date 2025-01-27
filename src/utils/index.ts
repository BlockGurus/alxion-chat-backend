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
