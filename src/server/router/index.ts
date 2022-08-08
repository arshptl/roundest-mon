// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { getPokemon } from "./getPokemon";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter).merge(
    "pokemon.", getPokemon
  );

// export type definition of API
export type AppRouter = typeof appRouter;
