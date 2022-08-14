//Сервер на родном модуле HTTP Node.js

/* const http = require("http");
const fs = require("fs").promises;

const PORT = 8081;

const requestHeandler = async (request, response) => {
  const manifest = await fs.readFile("./package.json", "utf-8");
  response.writeHead(200, { "Content-type": "text/json" });
  return response.end(manifest);
};

const server = http.createServer(requestHeandler);

server.listen(PORT, (err) => {
  if (err) {
    console.error("Erorr at  server launch: ", err);
  }
  console.log(`Server work at port : ${PORT}`);
}); */
