import express from "express";
import { userRouter } from "./user-router.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);
app.listen(port, () => console.log(`Server is listening on port ${port}`));