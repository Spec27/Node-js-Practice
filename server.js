// Сервер на Express
const express = require("express");
const morgan = require("morgan");

require("dotenv").config();

const app = express();
const axios = require("axios");

const { router } = require("./bookRouter");
const PORT = process.env.PORT || 8081;
const BASEURL = "http://api.weatherbit.io/v2.0/current";
const apiKey = process.env.KEY;
const LANG = "lang=uk";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use("/api", router);

app.use((request, response, next) => {
  console.log(`${request.method} ${request.originalUrl} ${new Date().toISOString()}`);
  next();
});

app.post("/home", (request, response) => {
  console.log(request.body);
  response.json({ javascritt: "ok", body: request.body });
});

//Запрос через Axios

app.get("/api/weather", async (request, response) => {
  try {
    const { latitude, logitude } = request.query;
    if (!latitude) {
      response.status(400).json({ mesage: "latitude parameter is mandatory" });
      return;
    }
    if (!logitude) {
      response.status(400).json({ mesage: "logitude parameter is mandatory" });
      return;
    }
    const res = await axios.get(`${BASEURL}?${apiKey}&lat=${latitude}&lon=${logitude}&${LANG}`);
    const watherDataAll = res.data;
    const { data } = watherDataAll;
    const [watherDataSelected] = data;
    const {
      timezone,
      city_name,
      temp,
      weather: { description },
    } = watherDataSelected;

    response.json({ timezone, city_name, temp, description });
  } catch (err) {
    response.status(500).json({ mesage: err.mesage });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Erorr at  server launch: ", err);
  }
  console.log(`Server work at port : ${PORT}`);
});

module.export = {
  express,
};
