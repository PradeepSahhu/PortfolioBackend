import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       username: this.username,
//     },
//     "ANYRANDOMTEXTHERESOTHATITCANBEGENERATEDWITHFAILBUTITWILLBEMORESECURETHANANYTEXTTHATWEHAVEEVERSEENWITHPRECISION",
//     {
//       expiresIn: "10d",
//     }
//   );
// };

// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     { _id: this._id },
//     "ANYRANDOMTEXTHERESOTHATITCANBEGENERATEDWITHFAIL",
//     { expiresIn: "20m" }
//   );
// };

export const User = mongoose.model("User", userSchema);
