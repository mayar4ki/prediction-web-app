import prisma from "~~/server/lib/prisma";

export interface Params {
  skip?: number;
  take?: number;
  tags?: string[];
}

export default defineEventHandler(async (event) => {
  const query = getQuery<Params>(event);

  if (query?.take && query.take > 10) {
    return createError({ statusCode: 400, statusMessage: "нет" });
  }

  const count = await prisma.round.count({
    where: query.tags
      ? {
          tags: {
            some: {
              name: {
                in: query.tags,
              },
            },
          },
        }
      : undefined,
  });

  const rounds = await prisma.round.findMany({
    skip: query?.skip ?? 0,
    take: query?.take ?? 4,
    orderBy: {
      roundId: "desc",
    },
    include: {
      tags: true,
    },
    where: query?.tags
      ? {
          tags: {
            some: {
              name: {
                in: query.tags,
              },
            },
          },
        }
      : undefined,
  });

  return { rounds, totalCount: count };
});
