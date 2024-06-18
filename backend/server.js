const { Server } = require("socket.io");
const http = require('http');
const app = require("./app");
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 4000;
const Socket = require("./Socket")

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors:{
    origin: "http://localhost:3000"
  },
});

io.on("connection", (socket)=> {
  console.log("socket io connected");
  Socket(socket);
});

mongoose
  .connect(DB_URL)
  .then(() =>
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB connected"));
