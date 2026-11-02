import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import cors, { CorsOptions } from "cors";


import authRouter from "./modules/auth/auth.route";
import categoryRouter from "./modules/category/category.router";
import carRouter from "./modules/car/car.router.js";


import errorMiddleware from "./middlewares/error.middleware";


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
app.use("/api/categories", categoryRouter);
app.use("/api/cars", carRouter);

app.use(errorMiddleware);

export default app;
