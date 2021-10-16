import Head from "next/head";
import { ShowToast } from "../../components/toast";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full flex-1 items-center justify-center flex">
        <h1 className="text-xl font-sans font-semibold"></h1>
        <ShowToast />
      </main>
    </div>
  );
}
