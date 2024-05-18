import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    password: { type: String, required: true }, //minlength=6
  },
  { timestamps: true, collection: "users" }
);

const Users = mongoose.model("Users", userSchema);

export default Users;
