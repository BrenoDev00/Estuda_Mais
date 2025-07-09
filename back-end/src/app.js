import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { taskRouter } from "./routes/task-routes.js";
import { commentRouter } from "./routes/comment-routes.js";
import { totalRecordsRouter } from "./routes/total-records-routes.js";
import { allowedOrigins } from "./utils/constants/allowed-cors-origins.js";
import cors from "cors";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    credentials: true,
  })
);

app.use(express.json());

app.use("/tasks", taskRouter);
app.use("/comments", commentRouter);
app.use("/totalRecords", totalRecordsRouter);

function bootstrap() {
  const port = process.env.PORT || 3001;

  app.listen(port, () => console.log("API rodando na porta", port));
}

bootstrap();
