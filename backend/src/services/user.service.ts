import { Roles, User } from "../models/user.model";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { login_schema, user_schema } from "../validators/user.validator";
import { generateToken } from "../utils/auth.util";

const signUp = async (req: Request, res: Response) => {
  try {
    const validatedData = await user_schema.parseAsync(req.body);

    const existedUser = await User.findOne({
      user_email: validatedData.user_email,
    });
    if (existedUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(validatedData.user_password, 10);

    const newUser = await User.create({
      ...validatedData,
      user_password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user_name: newUser.user_name,
        user_email: newUser.user_email,
        user_role: newUser.user_role,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const validatedData = await login_schema.parseAsync(req.body);
    const user = await User.findOne({ user_email: validatedData.user_email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are not registered user please try again.",
      });
    }

    const checkPassword = await bcrypt.compare(
      validatedData.user_password,
      user.user_password
    );

    if (!checkPassword) {
      return res.status(403).json({
        success: false,
        message: "Invalid credentials please try again.",
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      message: "You are logged in.",
      data: {
        token,
        user: {
          user_name: user.user_name,
          user_email: user.user_email,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// const logout = async (req: Request, res: Response) => {
//   try {
//   } catch (error) {
//     if (error instanceof Error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
export { login, signUp };
