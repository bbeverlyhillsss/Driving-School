import cookieParser from "cookie-parser";
import express, { type Express } from "express";

const app: Express = express();

app.use(cookieParser());
app.use(express.json());


app.get('/health', (req, res) => {
    res.json({ serverStatus: 'ok'})
})

export default app;
