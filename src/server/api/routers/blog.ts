import {z} from 'zod';
import {createTRPCRouter, publicProcedure} from '../trpc';
import {Prisma} from "@prisma/client";

const defaultBlogSelect = Prisma.validator<Prisma.BlogSelect>()({
  id: true,
  name: true,
  description: true,
  images: {
    select: {
      imageURL: true,
      imageBlur: true,
    },
  },
});

export const blogRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const {
        page = 1,
      } = input;

      const take = 12;
      const skip = take * (page - 1);

      const where = {
        published: true,
      };

      // if (slug) {
      //   const isParent = await ctx.prisma.collection.findFirst({
      //     where: {
      //       slug,
      //       parent: {
      //         is: null,
      //       },
      //     },
      //   });
      //
      //   where.collection = isParent ? { parentId: isParent.id } : { slug };
      // }

      const [blogs, totalCount] = await ctx.prisma.$transaction([
        ctx.prisma.blog.findMany({
          select: defaultBlogSelect,
          where,
          orderBy: { id: 'asc' },
          take,
          skip,
        }),
        ctx.prisma.blog.count({ where }),
      ]);

      return {
        blogs,
        totalCount,
      };
    }),
});
