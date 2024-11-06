import { CustomError } from "@/errors/CustomError";
import { RateLimitStrategy } from "./RateLimitStrategy";
import { FixedWindowStrategy } from "./strategies/FixedWindowStrategy";
import { SlidingWindowStrategy } from "./strategies/SlidingWindowStrategy";

type strategyType = "fixed" | "sliding";

export class RateLimitFactory {
  static create(
    strategyType: strategyType,
    requestLimit: number,
    windowSize: number
  ): RateLimitStrategy {
    switch (strategyType) {
      case "fixed":
        return new FixedWindowStrategy(requestLimit, windowSize);
      case "sliding":
        return new SlidingWindowStrategy(requestLimit, windowSize);
      default:
        throw new CustomError("Invalid rate limiting strategy type");
    }
  }
}
