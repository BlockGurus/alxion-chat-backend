// const express = require("express");
// const userController = require("../controllers/userController");

import express from "express";
import tweetController from "../controllers/tweets.controllers.ts";
const router = express.Router();
router.get("/", tweetController.getTweets);
module.exports = router;
