import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import authRouter from "./modules/auth/auth.route";
import errorMiddleware from "./middlewares/error.middleware";

const app: Express = express();

app.use(cookieParser());
app.use(express.json());


app.get('/health', (req, res) => {
    res.json({ serverStatus: 'ok'})
})

app.use('/api/auth', authRouter)

app.use(errorMiddleware)

export default app;
