// import axios from "axios";
const axios = require("axios");
const dotenv = require("dotenv")
const { get } = require("../routes/posts");

dotenv.config();

const getStatus = async (req, res) => {
  res.json({
    status: 200,
    success: true,
  });
};

const getPosts = async (req, res) => {
  // gets the query parameters
  const queryParams = req.query;
  let { tags, sortBy, direction } = queryParams;
  tags = tags.split(","); //turns it into an array

  // // if tags is empty
  if (!tags) {
    res.json({
      status: 400,
      error: "Tags parameter is required",
    });
    return;
  }

  // // if sortBy is not specified or if it's not exactly(spelling and case sensitive) one of [id, reads, likes, popularity]
  if (sortBy === undefined) {
    // undefined is okay since it is optional, but parameter can't be an empty string
    sortBy = "id";
  } else if (
    sortBy === "" ||
    ["id", "reads", "likes", "popularity"].indexOf(sortBy) < 0
  ) {
    res.json({
      status: 400,
      error: "sortBy parameter is invalid",
    });
    return;
  }

  // by default direction is set to asc
  if (direction === undefined) {
    // undefined is okay since it is optional, but parameter can't be an empty string
    direction = "asc";
  } else if (direction === "" || ["asc", "desc"].indexOf(direction) < 0) {
    res.json({
      status: 400,
      error: "direction parameter is invalid",
    });
    return;
  }

  // // fetch each single tag
  let result = [];

  tags.map(async (tag) => {
    let response = await axios
      .get(`${process.env.API_URL}?tag=${tag}`)
      .then((res) => {
        result.push(...res.data.posts);
      })
      .then((finalRes) => {
        // removes repeated items in results
        const uniqueResults = [
          ...new Map(result.map((item) => [item.id, item])).values(),
        ];

        result = uniqueResults;

        // sorts the results

        // sort by id
        if (sortBy === "id") {
          if (direction === "asc") {
            result = result.sort((a, b) => a.id - b.id);
            res.send(result);
            return;
          } else {
            result = result.sort((a, b) => b.id - a.id);
            res.send(result);
            return;
          }
        }

        // // sort by reads
        if (sortBy === "reads") {
          if (direction === "asc") {
            result = result.sort((a, b) => a.reads - b.reads);
            res.send(result);
            return;
          } else {
            result = result.sort((a, b) => b.reads - a.reads);
            res.send(result);
            return;
          }
        }

        // sort by likes
        if (sortBy === "likes") {
          if (direction === "asc") {
            result = result.sort((a, b) => a.likes - b.likes);
            res.send(result);
            return;
          } else {
            result = result.sort((a, b) => b.likes - a.likes);
            res.send(result);
            return;
          }
        }

        // sort by popularity
        if (sortBy === "popularity") {
          if (direction === "asc") {
            result = result.sort((a, b) => a.popularity - b.popularity);
            res.send(result);
            return;
          } else {
            result = result.sort((a, b) => b.popularity - a.popularity);
            res.send(result);
            return;
          }
        }
        //end of sort results section

        res.send(result);
      })
      .catch((error) => error.message);
  });

  
};

module.exports = { getStatus, getPosts };
