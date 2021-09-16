import "tailwindcss/tailwind.css";
import Wallet from "../hooks/useWallet";
import SyncWallet from "../hooks/useZksync";

function MyApp({ Component, pageProps }) {
  return (
    <Wallet.Provider>
      <SyncWallet.Provider>
        <Component {...pageProps} />
      </SyncWallet.Provider>
    </Wallet.Provider>
  );
}

export default MyApp;
