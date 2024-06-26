const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type:
        String,
        default: ""
    },
    password: {
        type: String,
        required: true
    }, //minlength=6
  },
  { timestamps: true, collection: "users" }
);

userSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
