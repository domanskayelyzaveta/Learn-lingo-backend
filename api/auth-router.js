import express from "express";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import { userSignInSchema, userSignupSchema } from "../models/User.js";
import authController from "../controllers/authController.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSignInSchema),
  authController.signin
);

authRouter.post("/logout", authenticate, authController.logout);


export default authRouter;
