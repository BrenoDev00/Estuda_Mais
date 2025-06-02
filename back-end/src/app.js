import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { taskRouter } from "./routes/task-routes.js";
import cors from "cors";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/tasks", taskRouter);

function bootstrap() {
  const port = process.env.PORT || 3001;

  app.listen(port, () => console.log("API rodando na porta", port));
}

bootstrap();
