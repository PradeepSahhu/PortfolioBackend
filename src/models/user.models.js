import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: true,
    },
    password: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // check if the password string is modified then only executing the password hasing function.

  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    "ANYRANDOMTEXTHERESOTHATITCANBEGENERATEDWITHFAILBUTITWILLBEMORESECURETHANANYTEXTTHATWEHAVEEVERSEENWITHPRECISION",
    {
      expiresIn: "10d",
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    "ANYRANDOMTEXTHERESOTHATITCANBEGENERATEDWITHFAIL",
    { expiresIn: "20m" }
  );
};

export const User = mongoose.model("User", userSchema);
