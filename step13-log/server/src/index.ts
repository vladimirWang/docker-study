import { Elysia } from "elysia";
import prisma from "./prisma";
import { redisClient, connectRedis } from "./redis";

const port = 4000

await connectRedis();

const userRouter = new Elysia().get("/echo", async () => {
  const users = await prisma.user.findMany();
  return {
    data: users, success: true
  }
}).post("/user", async ({ body }) => {
  const { username } = body as { username: string };
  const user = await prisma.user.create({
    data: {
      username,
    },
  });
  return {
    data: user, success: true
  }
})
const redisRouter = new Elysia().post("/redis/increment", async () => { 
  const value = await redisClient.incr("count");
  return {
    value, success: true 
  }
}).get("/redis", async() => {
  const value = await redisClient.get("count");
  return {
    value, success: true 
  }
})

const app = new Elysia().use(userRouter).use(redisRouter).listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
