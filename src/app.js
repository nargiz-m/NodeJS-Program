import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routers/user-router.js";
import { groupRouter } from "./routers/group-router.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(groupRouter);
app.listen(port, () => console.log(`Server is listening on port ${port}`));