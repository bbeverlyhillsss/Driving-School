import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import authRouter from "./modules/auth/auth.route";
import errorMiddleware from "./middlewares/error.middleware";
import cors, { CorsOptions } from "cors";

const app: Express = express();

app.use(cookieParser());
app.use(express.json());

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/health", (req, res) => {
  res.json({ serverStatus: "ok" });
});

app.use("/api/auth", authRouter);

app.use(errorMiddleware);

export default app;
