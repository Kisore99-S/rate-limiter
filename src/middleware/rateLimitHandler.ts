import { Request, Response, NextFunction } from "express";
import { rateLimits } from "@/utils/rateLimitTier";
import { RateLimitFactory } from "@/rateLimiter/RateLimitFactory";

const rateLimitHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { requestLimit } = rateLimits[req.user?.tier] || rateLimits["free"];
  const strategyType = (req.query.strategy as string) || "fixed";
  const windowSize = 60;

  try {
    const rateLimiter = RateLimitFactory.create(
      strategyType as "fixed" | "sliding",
      requestLimit,
      windowSize
    );
    const allowed = await rateLimiter.limit(req);

    if (!allowed) {
      res.status(409).json({ message: "Too many requests, please try again" });
      return;
    }
    next();
  } catch (error) {
    console.error(`Error in rate limiter: ${error}`);
    next(error);
  }
};

export default rateLimitHandler;
