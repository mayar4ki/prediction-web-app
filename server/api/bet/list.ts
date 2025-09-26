import prisma from "~~/server/lib/prisma";

export interface Params {
  skip?: number;
  take?: number;
  tags?: string | string[];
}

export default defineEventHandler(async (event) => {
  const query = getQuery<Params>(event);

  if (query?.take && query.take > 10) {
    throw createError({ statusCode: 400, statusMessage: "нет" });
  }

  const count = await prisma.round.count({
    where: query.tags
      ? {
          tags: {
            some: {
              name: {
                in: typeof query.tags === "string" ? [query.tags] : query.tags,
              },
            },
          },
        }
      : undefined,
  });

  const rounds = await prisma.round.findMany({
    skip: Number(query?.skip ?? 0),
    take: Number(query?.take ?? 4),
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
                in: typeof query.tags === "string" ? [query.tags] : query.tags,
              },
            },
          },
        }
      : undefined,
  });

  return { rounds: rounds.map((el) => el), totalCount: count };
});
