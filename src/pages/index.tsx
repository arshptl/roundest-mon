import { getOptionsForVote } from "@/utils/getRandomPokemons";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useState } from "react";

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
  // console.log(firstPokemon);
  // console.log(secondPokemon);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;


  const voteForRoundest = (selected: number) => {
    // TODO: fire mutation for persist changes

    updateIds(getOptionsForVote());
  }
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
        <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
          <div className="w-64 h-64 flex flex-col items-center">
            <img
              src={firstPokemon.data?.sprites.front_default}
              className="w-full"
            />
            <div className="text-xl text-center capitalize mt-[-2rem]">{firstPokemon.data?.name}</div>
            <button className={btn} onClick={() => voteForRoundest(first as number)}>Roundest</button>
          </div>
          <div className="p-8">Vs</div>
          <div className="w-64 h-64 flex flex-col items-center">
            <img
              src={secondPokemon.data?.sprites.front_default}
              className="w-full"
            />
            <div className="text-xl text-center capitalize mt-[-2rem]">{secondPokemon.data?.name}</div>
            <button className={btn} onClick={() => voteForRoundest(second as number)}>Roundest</button>
          </div>
          <div className="p-2"></div>
        </div>
      </main>
    </>
  );
};
export default Home;
