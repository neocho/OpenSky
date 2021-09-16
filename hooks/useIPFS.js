import { create } from "ipfs-http-client";
import multihash from "multihashes";

export const useIPFS = () => {
  const client = create("https://ipfs.infura.io:5001/api/v0");

  const uploadImage = async (img) => {
    const res = await client.add(img);
    const url = `https://ipfs.infura.io/ipfs/${res.path}`;
    return url;
  };

  const uploadMetadata = async (payload) => {
    const data = JSON.stringify(payload);
    const res = await client.add(data);
    const contentHash = res.cid;
    const multihashHex =
      "0x" +
      multihash
        .decode(multihash.fromB58String(contentHash))
        .digest.toString("hex");

    return multihashHex;
  };

  const decodeMultihash = (hash) => {
    const res = hash.substring(2, hash.length);
    return (
      "https://ipfs.io/ipfs/" +
      multihash.toB58String(
        multihash.encode(Buffer.from(res, "hex"), "sha2-256")
      )
    );
  };

  return {
    uploadImage,
    uploadMetadata,
    decodeMultihash,
  };
};
