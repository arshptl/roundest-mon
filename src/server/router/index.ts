// src/server/router/index.ts
import { createRouter } from "../context";
import superjson from "superjson";
import { getPokemon } from "./getPokemon";

// central point of all of our resolvers(apis)
export const appRouter = createRouter()
  .transformer(superjson).merge(
    "pokemon.", getPokemon
  );

// export type definition of API
export type AppRouter = typeof appRouter;
