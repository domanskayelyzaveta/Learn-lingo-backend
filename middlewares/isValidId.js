import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/httpError.js";

const isValidID = (req, res, next) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    return next(HttpError(404, `${userId} not valid id`));
  }
  next();
};

export default isValidID;
