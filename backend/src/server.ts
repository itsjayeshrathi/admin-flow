import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./config/db.config";
import routes from "../src/routes/routes";

const app = express();
const PORT = process.env.PORT || 3000;

//midlewares
app.use(express.json());
app.use(cors());

//configs
connectToDB();

//routes
app.get("/healthy", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});
app.use("/v1", routes);

//starting lmao
app.listen(PORT, () => {
  console.log(`Server started`);
});
