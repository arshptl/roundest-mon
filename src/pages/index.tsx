import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(["example.hello", {text: "harsh"}])

  if (isLoading) { return <div>Loading..</div> }
  if(data){return <div>{data.greeting}</div>}
  
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
          <div className="w-16 h-16 bg-red-100"></div>
          <div className="p-8">Vs</div>
          <div className="w-16 h-16 bg-red-100"></div>
        </div>
      </main>
    </>
  );
};

export default Home;
