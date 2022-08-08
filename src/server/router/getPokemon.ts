import { createRouter } from "./context";
import { z } from "zod";
import {prisma} from "@/server/utils/prisma";

export const getPokemon = createRouter().query("get-pokemon-by-id", {
  input: z.object({ id: z.number() }),
  async resolve({ input }) {
    const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + `${input.id}`);
    const res = await pokemon.json();
    const finalData = res;
    return {
      name: finalData.name,
      sprites: finalData.sprites,
    };
  },
}).mutation("cast-vote", {
  input: z.object({
    votedFor: z.number(),
    votedAgainst: z.number(),
  }),
  async resolve({input}) {
    const voteInDb = await prisma.vote.create({
      data: {
        ...input,
      }
    })
    return {success: true, vote: voteInDb}    
  },
})
  ;
