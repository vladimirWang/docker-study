import "./seed-env-preload.js";
import prisma from "../prismaClient.js";
async function main() {
    try {
        await prisma.$connect();
        // upsert 的 where 必须是唯一字段；username 已在 schema 中标为 @unique
        await prisma.user.upsert({
            where: { username: "anonymous" },
            create: { username: "anonymous" },
            update: {},
        });
        console.log("Seeding completed.");
    }
    catch (e) {
        console.error("Error during seeding:", e);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
