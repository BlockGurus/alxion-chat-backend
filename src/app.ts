import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/connection";
import { tweetRoutes } from "./routes/tweets.routes";
import logger from "./config/logger";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/tweets", tweetRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
