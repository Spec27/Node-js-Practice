const express = require("express");
const router = express.Router();

router
  .get("/books", (request, response) => {
    response.json({ books: [] });
  })
  .post("/books", (request, response) => {
    response.json({ books: [{ "garrri-potter": "secret room" }, { "garri-potter": "philosophical stone" }] });
  });
module.exports = { router };
