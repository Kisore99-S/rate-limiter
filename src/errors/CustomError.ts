export class CustomError extends Error {
  statusCode: number;
  details?: string;

  constructor(message: string, statusCode: number = 500, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
