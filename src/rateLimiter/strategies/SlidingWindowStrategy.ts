import { RateLimitStrategy } from "@/rateLimiter/RateLimitStrategy";
import { Request } from "express";
import connectRedis from "@/config/redis";

const redisClient = await connectRedis();

export class SlidingWindowStrategy implements RateLimitStrategy {
  private requestLimit: number;
  private windowSize: number;
  constructor(requestLimit: number, windowSize: number) {
    this.requestLimit = requestLimit;
    this.windowSize = windowSize;
  }
  async limit(req: Request): Promise<boolean> {
    const redisKey = `slidingwindow:${req.ip}`;
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

    // Remove expired requests
    await redisClient.zRemRangeByScore(
      redisKey,
      0,
      currentTime - this.windowSize
    );

    // Get request count within the current window
    const requestCount = await redisClient.zCard(redisKey);

    if (requestCount > this.requestLimit) {
      return false;
    }

    // Record the current request with a timestamp
    await redisClient.zAdd(redisKey, [
      { score: currentTime, value: `${req.ip}-${currentTime}` },
    ]);

    // await redisClient.expire(redisKey, this.windowSize);
    return true;
  }
}
