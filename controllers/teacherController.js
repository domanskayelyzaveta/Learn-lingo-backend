import wrapperAsync from "../decorators/controllerWrapper";
import User from "../models/User";

const getAll = wrapperAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await User.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  const total = await User.countDocuments({ owner });
  res.json({ result, total });
});

const addToFavorites = wrapperAsync(async (req, res) => {
  const { userId } = req.params;
  const { body } = req;
  const result = await updateUser(userId, body);
  if (!result) {
    return res.status(400).json({ message: "Missing field favorite" });
  }
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

export default {
  getAll,
  addToFavorites,
};
