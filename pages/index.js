import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>OpenSky</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="flex justify-around text-2xl font-sans font-semibold">
          <h1>
            OpenSky lets you mint and transfer NFTs for a fraction of the cost on
            Ethereum.
          </h1>
        </div>
        <div className="flex justify-around text-2xl font-sans font-semibold ">
          <h1>It uses zkSync, a scaling and privacy engine for Ethereum.</h1>
        </div>
      </main>
    </div>
  );
}
