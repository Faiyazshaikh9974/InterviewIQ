import { User } from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const currentUser = await User.findById(userId);

    return res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({
        message: `current user not found.. ${error}`
    })
  }
};
