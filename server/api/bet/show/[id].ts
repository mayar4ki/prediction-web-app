import prisma from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const round = await prisma.round.findFirst({
    where: {
      roundId: id,
    },
    include: {
      tags: true,
    },
  });

  return { round };
});
