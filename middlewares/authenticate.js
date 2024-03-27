import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import HttpError from "../helpers/httpError.js";
import ctrlWrapper from "../decorators/controllerWrapper.js";
import User from "../models/User.js";

dotenv.config();

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("REQ HEADERS::",req.headers );
  if (!authorization) {
    throw HttpError(401, "Authorization headers not define");
  }
  const [bearer, token] = authorization.split(" ");
  console.log("TOKEN",token);
  console.log("Bearer",bearer);
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    console.log("user::", user);
    console.log("userTOKEN::", user.token);
    if (!user || !user.token) {
      throw HttpError(401, "User not found");
    }

    req.user = user;
    console.log("USER::", user);

    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

export default ctrlWrapper(authenticate);
