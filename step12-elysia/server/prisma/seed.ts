import prisma from "../src/prisma";

async function main() {
  //   await prisma.user.upsert({
  //     where: {
  //       username: "anonymous",
  //     },
  //     create: {
  //       username: "anonymous",
  //     },
  //     update: {},
  //   });
  await prisma.user.upsert({
    where: { username: "anonymous" },
    create: { username: "anonymous" },
    update: {},
  });
  console.log("Seeding completed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
