import express from "express";

declare global {
  namespace Express {
    export interface Request {
      user?: { id: string; tier: string }; // Customize this type based on your needs
    }
  }
}
