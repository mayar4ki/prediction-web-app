import prisma from "../lib/prisma";

export default defineEventHandler(async (event) => {

    const tags = await prisma.tag.findMany();

    return { tags };
})