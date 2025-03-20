import {createTRPCRouter} from './trpc';
import {collectionRouter} from './routers/collection';
import {productRouter} from './routers/product';
import {blogRouter} from "./routers/blog";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  collection: collectionRouter,
  product: productRouter,
  blog: blogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
