import Link from "next/link";
import { cutAddress } from "../../helpers/cutAddress";

export default function PreviewCard({ info, val }) {
  return (
    // <Link href={`/preview/${info.creatorAddress}/${info.symbol}`}>
    <div
      className="flex flex-col w-80 h-80 relative overflow-hidden border-2 border-gray-200 leading-6 rounded-t-xl hover:cursor-pointer"
      key={val}
    >
      <div className="flex relative overflow-hidden justify-center">
        <img src={info.image} className="object-cover w-full h-72" alt="" />
      </div>
      <div className="flex flex-col relative p-2 mb-8">
        <h1 className="font-sans text-sm font-semibold uppercase">
          {info.name.length != 0 ? info.name : "Unamed"}
        </h1>

        <h1 className="font-sans text-sm font-semibold">
          Minted by {cutAddress(info.creatorAddress)}
        </h1>
      </div>
      <div className="flex flex-row absolute bottom-3 right-2">
        <h1 className="font-sans text-xs font-semibold uppercase border border-gray-500 rounded-xl px-3">
          {info.type}
        </h1>
      </div>
    </div>
    // </Link>
  );
}
