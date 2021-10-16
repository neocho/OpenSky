import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { ShowToast } from "../components/toast";
import { cutAddress } from "../helpers/cutAddress";
import SyncWallet from "../hooks/useZksync";
import Wallet from "../hooks/useWallet";
import { useIPFS } from "../hooks/useIPFS";
import axios from "axios";
import PreviewCard from "../components/modal/PreviewCard";
import { Loading } from "../components/loader";

export default function Explore() {
  const { decodeMultihash } = useIPFS();

  const { provider, address } = Wallet.useContainer();
  const { nfts } = SyncWallet.useContainer();

  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSelection, setCurrentSelection] = useState("verified");

  const getData = useCallback(async (verified, committed) => {
    let arr = [];

    if (committed !== undefined) {
      for (let [k, v] of Object.entries(committed)) {
        const url = decodeMultihash(v.contentHash);
        const info = await axios.get(url);
        const res = info.data;

        arr.push({
          address: v.address,
          contentHash: v.contentHash,
          creatorAddress: v.creatorAddress,
          creatorId: v.creatorId,
          id: v.id,
          serialId: v.serialId,
          symbol: v.symbol,
          name: res.name,
          externalUrl: res.external_url,
          description: res.description,
          attributes: res.attributes,
          image: res.image,
          type: "committed",
        });
      }
    }

    if (verified !== undefined) {
      for (let [k, v] of Object.entries(verified)) {
        const url = decodeMultihash(v.contentHash);
        const info = await axios.get(url);
        const res = info.data;

        arr.push({
          address: v.address,
          contentHash: v.contentHash,
          creatorAddress: v.creatorAddress,
          creatorId: v.creatorId,
          id: v.id,
          serialId: v.serialId,
          symbol: v.symbol,
          name: res.name,
          externalUrl: res.external_url,
          description: res.description,
          attributes: res.attributes,
          image: res.image,
          type: "verified",
        });
      }
    }

    setCollection(arr);
  }, []);

  useEffect(async () => {
    const verified = nfts.verified;
    const committed = nfts.committed;
    setLoading(true);
    await getData(verified, committed);
    setLoading(false);
  }, [nfts]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Explore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {provider === null && address === null ? (
        <main className="w-full flex-1 items-center justify-center flex">
          <h1 className="text-xl font-sans font-semibold">
            Connect to your wallet to view your NFTs.
          </h1>
          <ShowToast />
        </main>
      ) : (
        <main className="flex flex-col w-full flex-1 px-40 py-16">
          <div className="flex flex-col">
            <div className="mt-8">
              <h1 className="text-gray-800 text-3xl font-sans font-bold mb-2">
                {cutAddress(address)}
              </h1>
            </div>

            <div className="flex flex-row space-x-5 mt-10">
              <button onClick={() => setCurrentSelection("verified")}>
                <a
                  className={
                    currentSelection === "verified"
                      ? "text-gray-800 text-base font-sans font-bold shadow-link mb-2"
                      : "text-gray-800 text-base font-sans font-semibold mb-2 hover:text-gray-500"
                  }
                >
                  Verified
                </a>
              </button>
              <button onClick={() => setCurrentSelection("committed")}>
                <a
                  className={
                    currentSelection === "committed"
                      ? "text-gray-800 text-base font-sans font-bold shadow-link mb-2"
                      : "text-gray-800 text-base font-sans font-semibold mb-2 hover:text-gray-500"
                  }
                >
                  Committed
                </a>
              </button>
            </div>

            {loading === true ? (
              <Loading style="mt-12 ml-2" />
            ) : (
              <div className="flex flex-wrap grid grid-cols-4 mt-10">
                {collection
                  .filter(
                    (curr) =>
                      curr.type.includes(currentSelection) &&
                      curr.image !== undefined
                  )
                  .map((curr, idx) => (
                    <PreviewCard info={curr} val={idx} />
                  ))}
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}
