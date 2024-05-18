const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/chatBD", {});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB connected"));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${server.address().port}`);
});

app.options("*", cors());

const userSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  dateOfCreation: { type: Date, default: Date.now },
}); //TODO додати аватар

const messageSchema = new mongoose.Schema({
  from: { type: String }, //FK user_id
  to: { type: String }, //FK user_id
  content: {}, //текст, файли, зображення ...
  date: { type: Date, default: Date.now },
});

const Messages = mongoose.model("Messages", messageSchema);
const Users = mongoose.model("Users", userSchema);

app.get("/users", async (req, res) => {
  try {
    await Users.find({})
      .then(function (el) {
        res.json(el);
      })
      .catch(function (err) {
        console.log(error);
      });
    console.log("get /users");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/messages", async (req, res) => {
  try {
    await Messages.find({})
      .then(function (el) {
        res.json(el);
      })
      .catch(function (err) {
        console.log(error);
      });
    console.log("get /messages");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
