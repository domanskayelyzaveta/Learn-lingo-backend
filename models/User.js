import Joi from "joi";
import handleMongooseError from "../helpers/handleMongooseError.js";
import { Schema, model } from "mongoose";
import addUpdateSetting from "../helpers/addUpdateSetting.js";

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 64,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);
userSchema.pre("findOneAndUpdate", addUpdateSetting);
userSchema.post("findOneAndUpdate", handleMongooseError);

export const userSignupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const User = model("user", userSchema);

export default User;
