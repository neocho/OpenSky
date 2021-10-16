import { useState, useEffect } from "react";
import Wallet from "../hooks/useWallet";
import { cutAddress } from "../helpers/cutAddress";

export const ConnectWallet = () => {
  const { address, ensName, login, provider } = Wallet.useContainer();
  const [buttonContent, setButtonContent] = useState("Connect to wallet");

  useEffect(() => {
    if (address !== null) {
      setButtonContent(cutAddress(address));
    } else {
      setButtonContent("Connect to wallet");
    }
  }, [provider, ensName, address]);

  return (
    <div>
      <button
        className="h-9 w-48 px-5 justify-center items-center font-sans text-base font-semibold rounded-lg border border-gray-200 bg-gray-100 hover:border-gray-300"
        onClick={() => login()}
      >
        {buttonContent}
      </button>
    </div>
  );
};
