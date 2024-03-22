import express from "express";
import ctrl from "../controllers/teacherController.js";
import isValidID from "../middlewares/isValidId.js";
import { updateFavoriteSchema } from "../models/Teachers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";

const teacherRouter = express.Router();

// teacherRouter.use(authenticate); // коли всі маршрути приватні

teacherRouter.get("/", ctrl.getAll);

teacherRouter.patch(
    "/:teacherId/favorites",
    isValidID,
    isEmptyBody,
    validateBody(updateFavoriteSchema),
    ctrl.addToFavorites
  );

export default teacherRouter;
