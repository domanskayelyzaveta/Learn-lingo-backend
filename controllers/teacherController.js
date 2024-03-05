import wrapperAsync from "../decorators/controllerWrapper.js";
import Teachers from "../models/Teachers.js";

// const getAll = wrapperAsync(async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;
//   const result = await Teachers.find({ owner }, "-createdAt -updatedAt", {
//     skip,
//     limit,
//   });
//   const total = await Teachers.countDocuments({ owner });
//   res.json({ result, total });
// });

const getAll = async (req, res) => {
  const result = await Teachers.find({}, "-createdAt -updatedAt");
  res.json(result);
};

// const getById = wrapperAsync(async (req, res) => {
//   const { userId } = req.params;
//   const { _id: owner } = req.user;
//   const result = await User.findOne({ _id: userId, owner });
//   if (!result) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.json(result);
// });

const updateTeacher = wrapperAsync(async (req, res) => {
    const { teacherId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate(
      { _id: teacherId, owner },
      req.body
    );
    if (!result) {
      throw HttpError(404, `Teacher with id=${teacherId} not found`);
    }
  
    res.json(result);
  });


const addToFavorites = wrapperAsync(async (req, res) => {
  const { teacherId } = req.params;
  const { body } = req;
  const result = await updateTeacher(teacherId, body);
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
