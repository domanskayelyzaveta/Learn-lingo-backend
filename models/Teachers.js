import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";
// import addUpdateSetting from "../helpers/addUpdateSetting.js";
import Joi from "joi";

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    surname: {
      type: String,
    },
    languages: {
      type: [String],
    },
    levels: {
      type: [String],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviews: {
      type: [String],
    },
    price_per_hour: {
      type: Number,
      min: 0,
    },
    lessons_done: {
      type: Number,
      min: 0,
    },
    avatar_url: {
      type: String,
    },
    lesson_info: {
      type: String,
    },
    conditions: {
      type: [String],
    },
    experience: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

teacherSchema.post("save", handleMongooseError);
// teacherSchema.pre("findOneAndUpdate", addUpdateSetting);
// teacherSchema.post("findOneAndUpdate", handleMongooseError);

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Teachers = model("teacher", teacherSchema);

export default Teachers;
