import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth.util";
import { Roles, User } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authorization.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed" });
  }
};

const checkRole = (roles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.user_role)) {
      return res.status(403).json({
        error: "You don't have permission to perform this action",
      });
    }
    next();
  };
};

export { checkRole };

export { authMiddleware };
