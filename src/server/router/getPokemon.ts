import { createRouter } from "../context";
import { z } from "zod";
import { prisma } from "@/server/utils/prisma";

export const getPokemon = createRouter()
  .query("get-pokemon-by-id", {
    input: z.object({ id: z.number() }),
    async resolve({ input }) {
      // const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + `${input.id}`);
      // const res = await pokemon.json();
      // const finalData = res;

      const pokemon = await prisma.pokemon.findFirst({
        where: { id: input.id },
      });

      if (!pokemon) throw new Error("lol doesn't exist");

      return pokemon;
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      });
      return { success: true, vote: voteInDb };
    },
  });
