import express, { Application } from "express";
import "express-async-errors";

import { logger } from "track";

const app: Application = express();

// create a write stream (in append mode)
// setup the logger
process.on("uncaughtException", ex => {
  logger.error(ex.message, ex);
});

process.on("unhandledRejection", ex => {
  throw ex;
});

export { app };
