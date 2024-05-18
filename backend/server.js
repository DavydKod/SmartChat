const app = require("./app");
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 4000;

mongoose
  .connect(DB_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB connected"));
