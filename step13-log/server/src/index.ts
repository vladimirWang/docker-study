import { Elysia } from "elysia";
import prisma from "./prisma";
import { redisClient, connectRedis } from "./redis";
import { logger } from "./logger";

const port = 4000;

await connectRedis();

const userRouter = new Elysia()
  .get("/echo", async () => {
    logger.info({ route: "/echo" }, "request");
    const users = await prisma.user.findMany();
    logger.info({ usersCount: users.length }, "fetched users");
    return {
      data: users,
      success: true,
    };
  })
  .post("/user", async ({ body }) => {
    const { username } = body as { username: string };
    logger.info({ username }, "create user");
    const user = await prisma.user.create({
      data: {
        username,
      },
    });
    logger.info({ user }, "create user success");
    return {
      data: user,
      success: true,
    };
  });
const redisRouter = new Elysia()
  .post("/redis/increment", async () => {
    const value = await redisClient.incr("count");
    return {
      value,
      success: true,
    };
  })
  .get("/redis", async () => {
    const value = await redisClient.get("count");
    return {
      value,
      success: true,
    };
  });

const app = new Elysia().use(userRouter).use(redisRouter).listen(port);

logger.info(
  { hostname: app.server?.hostname, port: app.server?.port },
  "Elysia started",
);
