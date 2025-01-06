import { model, Schema } from "mongoose";

export const Roles = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type Roles = (typeof Roles)[keyof typeof Roles];

interface IUser {
  user_name: string;
  user_email: string;
  user_password: string;
  user_role?: Roles;
}

const userSchema = new Schema<IUser>(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    user_role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.USER,
    },
  },
  {
    timestamps: true,
  }
);
export const User = model<IUser>("User", userSchema);
