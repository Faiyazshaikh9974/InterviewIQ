import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(400).json({
        message: "toke not found...",
      });
    }

    let VerifyUser = await jwt.verify(token, process.env.JWT_SECRET);

    if (!VerifyUser) {
      res.status(400).json({
        message: "Invalid user Token",
      });
    }

    req.userId = VerifyUser.id;

    next();
  } catch (error) {
    res.status(500).json({
        message: `Something went wrong while verifying current user ${error}`
    })
  }
};
