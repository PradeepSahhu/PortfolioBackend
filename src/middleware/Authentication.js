// it will be used to verify the user - authentication.

// for this i need to create the refresh and access token

// modify the model of the projects such that it can store the refresh token

import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/ApiError.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  //cookies are avaialbe everywhere, req,res
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = await jwt.verify(
      token,
      "ANYRANDOMTEXTHERESOTHATITCANBEGENERATEDWITHFAILBUTITWILLBEMORESECURETHANANYTEXTTHATWEHAVEEVERSEENWITHPRECISION"
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      // Discuss about frontend
      throw new ApiError(401, "Invalid Access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
