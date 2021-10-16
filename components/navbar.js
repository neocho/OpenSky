import { ConnectWallet } from "../components/connect";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row sticky top-0 h-20 px-8 border-b border-gray-200 backdrop-filter backdrop-blur-md">
      <div className="flex inset-y-0 left-0 items-center">
        <Link href="/">
          <button>
            <h1 className="text-3xl font-sans font-bold">OpenSky</h1>
          </button>
        </Link>
      </div>
      <div className="flex flex-row absolute inset-y-0 right-8 space-x-8 items-center">
        <Link href="/mint">
          <a className="text-base font-sans font-semibold">Mint</a>
        </Link>
        {/* <Link href="/transfer">
          <a className="text-base font-sans font-semibold">Transfer</a>
        </Link> */}
        <Link href="/profile">
          <a className="text-base font-sans font-semibold">Profile</a>
        </Link>
        <Link href="/faq">
          <a className="text-base font-sans font-semibold">FAQ</a>
        </Link>
        <ConnectWallet />
      </div>
    </div>
  );
}
