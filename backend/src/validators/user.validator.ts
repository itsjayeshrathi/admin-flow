import { z } from "zod";

const user_schema = z.object({
  user_name: z.string().min(3),
  user_email: z.string().email(),
  user_password: z.string().min(8).max(30),
  user_role: z.string().optional(),
});

const login_schema = z.object({
  user_email: z.string().email(),
  user_password: z.string().min(8).max(30),
});
export { user_schema, login_schema };
