import pino from "pino";
import { createWriteStream, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const isDev = process.env.NODE_ENV === "development";
// const isDev = false;

function createLogger() {
  const baseOptions: pino.LoggerOptions = {
    level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label }),
    },
  };

  if (isDev) {
    return pino(
      {
        ...baseOptions,
      },
      pino.destination(1),
    );
  }

  const logDir = resolve(process.cwd(), process.env.LOG_DIR || "logs");
  const appLogPath = join(logDir, "app.log");
  const errorLogPath = join(logDir, "error.log");

  try {
    mkdirSync(logDir, { recursive: true });
    console.log("create log directory success: ", logDir);
  } catch (error) {
    console.error("create logger error: ", error);
  }

  const appStream = createWriteStream(appLogPath, { flags: "a" });
  const errorStream = createWriteStream(errorLogPath, { flags: "a" });

  return pino(
    baseOptions,
    pino.multistream([
      { stream: process.stdout },
      { stream: appStream },
      { stream: errorStream, level: "error" },
    ]),
  );
}

export const logger = createLogger();

export default logger;
