import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error("SECRET_KEY environment variable is not set");
}

interface JWTPayload {
  id: string;
}

const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: "7d" });
};

const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, secretKey) as JWTPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export { generateToken, verifyToken };
