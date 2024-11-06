import { Request } from "express";

export interface RateLimitStrategy {
  limit(req: Request): Promise<boolean>;
}
