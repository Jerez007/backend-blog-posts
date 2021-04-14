// import express from "express";
// import { getStatus, getPosts } from "../controllers/posts.js";
// import cache from "../routeCache.js";

const express = require("express");
const { getStatus, getPosts } = require("../controllers/posts");
const cache = require("../routeCache");

const router = express.Router();

router.get("/ping", cache(300),  getStatus);
router.get("/posts", cache(300),  getPosts);

module.exports = router;