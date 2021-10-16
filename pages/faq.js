import Head from "next/head";

export default function FAQ() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>FAQ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col w-full flex-1 px-40 py-20">
        <div className="flex flex-col justify-around mt-4">
          <h1 className="text-gray-800 text-3xl font-sans font-bold mb-6 underline">
            FAQ
          </h1>
          <p>
            Thanks for stopping by OpenSky! Before minting, follow these steps
            to prepare your account.
          </p>
        </div>

        <div className="flex flex-col justify-around mt-4 space-y-1">
          <p>
            1. Connect to your zkSync wallet{" "}
            <a href="https://wallet.zksync.io">
              <b>here.</b>
            </a>
          </p>
          <p>
            2. <a href="https://wallet.zksync.io/deposit">Deposit</a> ETH to
            your zkSync wallet from mainnet.
          </p>
          <p>
            3. On your zkSync wallet, press the Transfer button in the home tab.
          </p>
          <p>
            4. Transfer some ETH to yourself. This will activate your account
            and allow you to mint NFTs. There will be an activation fee
            associated with this transfer.
          </p>
          <p>5. Wait for a couple minutes before you can mint an NFT.</p>
        </div>
      </main>
    </div>
  );
}
