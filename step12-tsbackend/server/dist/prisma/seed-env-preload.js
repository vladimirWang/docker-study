import { config } from "dotenv";
import { existsSync } from "fs";
let envFile = ".env.prod";
if (process.env.NODE_ENV === "test") {
    envFile = ".env.test";
}
else if (process.env.NODE_ENV === "development") {
    envFile = ".env.dev";
}
if (existsSync(envFile)) {
    config({ path: envFile });
}
