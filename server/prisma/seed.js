import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const tagsSeed = ["politic", "sport", "crypto", "business", "pop", "since"];

  const tags = await prisma.tag.createMany({
    data: tagsSeed.map((el) => ({ name: el })),
  });

  console.log({ tags });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
