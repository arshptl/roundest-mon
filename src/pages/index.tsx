import { getOptionsForVote } from "@/utils/getRandomPokemons";
import type { NextPage } from "next";
import Head from "next/head";
import { inferQueryOutput, trpc } from "../utils/trpc";
import { useState } from "react";
import { inferQueryResponse } from "./api/trpc/[trpc]";
import Image from "next/image";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
const Home: NextPage = () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // const {data, isLoading} = trpc.useQuery(["example.hello", {text: "harsh"}])
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;
  const firstPokemon = trpc.useQuery([
    "pokemon.get-pokemon-by-id",
    { id: first as number },
  ]);
  const secondPokemon = trpc.useQuery([
    "pokemon.get-pokemon-by-id",
    { id: second as number },
  ]);

  const voteMutation = trpc.useMutation(["pokemon.cast-vote"]);
  // console.log(firstPokemon);
  // console.log(secondPokemon);

  // if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundest = (selected: number) => {
    // TODO: fire mutation for persist changes
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second as number });
    } else {
      voteMutation.mutate({
        votedFor: second as number,
        votedAgainst: first as number,
      });
    }
    updateIds(getOptionsForVote());
  };
  return (
    <>
      <Head>
        <title>Roundest-mon</title>
        <meta
          name="description"
          content="Voting app to vote the roundest pokemon"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen flex flex-col justify-center items-center text-center">
        <div className="">Which pokemon is Rounder?</div>
        <div className="p-2"></div>
        <div className="p-8 flex justify-between items-center max-w-2xl">
          {!firstPokemon.isLoading &&
            firstPokemon.data &&
            !secondPokemon.isLoading &&
            secondPokemon.data && (
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(first as number)}
              />
            )}
          <div className="p-8">Vs</div>

          {!firstPokemon.isLoading &&
            firstPokemon.data &&
            !secondPokemon.isLoading &&
            secondPokemon.data && (
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(second as number)}
              />
            )}

          <div className="p-2"></div>
        </div>
      </main>
    </>
  );
};

type pokemonFromServer = inferQueryResponse<"pokemon.get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: pokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="w-64 h-64 flex flex-col items-center">
      <Image
        width={256}
        height={256}
        layout="fixed"
        src={props.pokemon.sprites.front_default}
        className="w-full"
        alt=""
      />
      <div className="text-xl text-center capitalize mt-[-2rem]">
        {props.pokemon.name}
      </div>
      <button className={btn} onClick={() => props.vote()}>
        Roundest
      </button>
    </div>
  );
};

export default Home;
