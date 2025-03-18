import express from "express";

import { UserLogin, RegisterUser } from "../contorllers/user.controllers.js";

const router = express.Router();

router.route("/userlogin").get(UserLogin);
// router.route("/registerUser").post(RegisterUser);

export default router;
