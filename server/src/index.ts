import express, { Request, Response } from "express";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
