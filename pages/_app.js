import 'tailwindcss/tailwind.css'
import Wallet from '../hooks/useWallet'

function MyApp({ Component, pageProps }) {
  return (
    <Wallet.Provider>
      <Component {...pageProps} />
    </Wallet.Provider>
  );
}

export default MyApp
