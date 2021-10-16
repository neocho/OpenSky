import { useState, useMemo, useCallback, useEffect } from "react";
import * as zksync from "zksync";
import { ethers } from "ethers";
import Onboard from "bnc-onboard";
import { createContainer } from "unstated-next";
import { showToast } from "../helpers/showToast";
import axios from "axios";

const walletChoices = [
  {
    walletName: "metamask",
  },
  {
    walletName: "walletConnect",
    rpc: {
      ["1"]: `${process.env.WALLET_CONNECT_RPC_ENDPOINT}`,
    },
  },
];

const walletChecks = [{ checkName: "accounts" }, { checkName: "connect" }];

export const useWallet = () => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [syncWallet, setSyncWallet] = useState(null);
  const [syncProvider, setSyncProvider] = useState(null);

  const onboard = useMemo(() => {
    return Onboard({
      dappId: process.env.BLOCKNATIVE_KEY,
      networkId: 1,
      hideBranding: true,
      blockPollingInterval: 5000,
      walletSelect: {
        heading: "Connect to OpenSky 🌞",
        description: "Select a wallet",
        wallets: walletChoices,
      },
      subscriptions: {
        wallet: async (wallet) => {
          if (wallet.provider) {
            const provider = new ethers.providers.Web3Provider(wallet.provider);

            setProvider(provider);

            const syncProvider = await zksync.getDefaultProvider("mainnet");

            const ethWalletSigner = new ethers.providers.Web3Provider(
              provider.provider
            ).getSigner();
            const syncWallet = await zksync.Wallet.fromEthSigner(
              ethWalletSigner,
              syncProvider
            );

            setSyncProvider(syncProvider);
            setSyncWallet(syncWallet);
          } else {
            setSyncProvider(null);
            setSyncWallet(null);
            setAddress(null);
            setProvider(null);
          }
        },
        address: async (address) => {
          if (address !== null) {
            setAddress(address);
          } else {
            setAddress(null);
            setProvider(null);
          }
        },
      },
      walletCheck: walletChecks,
    });
  }, []);

  const login = useCallback(async () => {
    await onboard.walletSelect();

    try {
      await onboard.walletCheck();
    } catch (error) {
      showToast(error.message);
    }
  }, [onboard]);

  return {
    provider,
    syncProvider,
    syncWallet,
    address,
    login,
  };
};

// Export this container for global state
const Wallet = createContainer(useWallet);
export default Wallet;
