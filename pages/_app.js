import Layout from "../components/layout";
import Wallet from "../hooks/useWallet";
import SyncWallet from "../hooks/useZksync";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <Wallet.Provider>
      <SyncWallet.Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SyncWallet.Provider>
    </Wallet.Provider>
  );
}

export default MyApp;
