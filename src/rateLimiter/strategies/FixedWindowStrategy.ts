import { RateLimitStrategy } from "@/rateLimiter/RateLimitStrategy";
import { Request } from "express";
import connectRedis from "@/config/redis";

const redisClient = await connectRedis();

export class FixedWindowStrategy implements RateLimitStrategy {
  private requestLimit: number;
  private windowSize: number;
  constructor(requestLimit: number, windowSize: number) {
    this.requestLimit = requestLimit;
    this.windowSize = windowSize;
  }
  async limit(req: Request): Promise<boolean> {
    const redisKey = `fixedWindow:${req.ip}`;
    const requestCount = await redisClient.incr(redisKey);

    if (requestCount == 1) {
      await redisClient.expire(redisKey, this.windowSize);
    }

    return requestCount <= this.requestLimit;
  }
}
