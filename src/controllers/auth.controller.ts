import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { expressjwt, Request as JWTRequest } from "express-jwt";

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).exec();
    if (!user) {
      return res.json("User not found");
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expires: new Date(), httpOnly: true });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(401).json({ error: "Could not sign in." });
  }
};

const signOut = async (req: Request, res: Response) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Sign out" });
};

const requireSignIn = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
});

// const hasAuthorization = (req: Request, res: Response, next: NextFunction) => {
//   const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
//   if (!authorized) {
//     return res.status(403).json({
//       error: "User is not authorized!",
//     });
//   }
// };

export { signOut, signIn };
