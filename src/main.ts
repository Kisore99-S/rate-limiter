import express, { Request, Response, NextFunction } from "express";
import rateLimitHandler from "./middleware/rateLimitHandler";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

const PORT = process.env.PORT || 4000;

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    id: "123",
    tier: "free",
  };
  next();
});

app.get("/feature-a", rateLimitHandler, (req: Request, res: Response) => {
  res.json({ message: "Hola Amigo" });
  return;
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
