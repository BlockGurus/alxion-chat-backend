import Redis from "ioredis";
import logger from "../config/logger";

// Connect to Redis server (local or remote)
const redis = new Redis({
  host: "localhost", // If using local Redis
  port: 6379, // Default Redis port
  password: "your_redis_password", // Optional: for Redis with password
  db: 0, // Redis database number (default is 0)
});

redis.on("connect", () => {
  logger.info("Connected to Redis");
});

redis.on("error", (err) => {
  logger.error("Redis error:", err);
});

export default redis;
