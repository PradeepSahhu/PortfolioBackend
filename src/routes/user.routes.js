import express from "express";

import {
  UserLogin,
  RegisterUser,
  logoutUser,
  refreshAccessTokens,
} from "../contorllers/user.controllers.js";

import { verifyJWT } from "../middleware/Authentication.js";

const router = express.Router();

router.route("/userlogin").get(UserLogin);
router.route("/logoutUser").post(verifyJWT, logoutUser);
// router.route("/registerUser").post(RegisterUser);

export default router;
