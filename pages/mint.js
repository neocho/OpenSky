import Head from "next/head";
import { useState } from "react";
import SyncWallet from "../hooks/useZksync";
import Wallet from "../hooks/useWallet";
import { ShowToast } from "../components/toast";
import { showToast } from "../helpers/showToast";

export default function Mint() {
  const { mint } = SyncWallet.useContainer();
  const { address, syncWallet } = Wallet.useContainer();

  const [formInput, setFormInput] = useState({
    name: "",
    external_url: "",
    description: "",
    file: null,
  });
  const [attributes, setAttributes] = useState([
    { trait_type: "", trait_name: "" },
  ]);
  const [receipt, setReceipt] = useState(null);

  const [submitting, setIsSubmitting] = useState(false);

  const addNewAttribute = () => {
    setAttributes([...attributes, { trait_type: "", trait_name: "" }]);
  };

  const handleAttributeInputChange = (e, idx) => {
    const { name, value } = e.target;
    const list = [...attributes];
    list[idx][name] = value;
    setAttributes(list);
  };

  const deleteAttribute = (idx) => {
    const list = [...attributes];
    list.splice(idx, 1);
    setAttributes(list);
  };

  const handleClick = async () => {
    if (address !== null) {
      if (syncWallet !== null) {
        setIsSubmitting(true);

        try {
          const res = await mint(formInput, attributes);
          setReceipt(res);
          setIsSubmitting(false);

          setFormInput({
            name: "",
            external_url: "",
            description: "",
            file: null,
          });
          setAttributes([{ trait_type: "", trait_name: "" }]);
        } catch (error) {
          showToast(error.message);
        }
      } else {
        showToast("Authorize zkSync wallet to mint!");
      }
    } else {
      showToast("Sign into Metamask");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Mint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col w-full flex-1 px-24 py-8 text-centers">
        <div className="flex flex-col ">
          <div>
            <div className="mt-8 space-y-4 w-5/12">
              <h1 className="text-4xl font-sans font-bold">Mint your NFT</h1>
              <h2 className="text-base font-sans font-medium">
                Before minting, please read the the FAQ page.
              </h2>
            </div>
            <div className="flex flex-col space-y-5 mt-10 w-5/12">
              <div className="space-y-5">
                <div className="flex flex-col">
                  <label className="text-xl font-sans font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2"
                    onChange={(e) =>
                      setFormInput({ ...formInput, itemName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xl font-sans font-semibold">
                    External link
                  </label>
                  <input
                    type="text"
                    className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2"
                    onChange={(e) =>
                      setFormInput({
                        ...formInput,
                        externalUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xl font-sans font-semibold">
                    Description
                  </label>
                  <input
                    type="text"
                    className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2"
                    onChange={(e) =>
                      setFormInput({
                        ...formInput,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xl font-sans font-semibold">
                    Select File
                  </label>
                  <input
                    type="file"
                    className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2"
                    onChange={(e) =>
                      setFormInput({ ...formInput, file: e.target.files[0] })
                    }
                  />
                </div>

                <div className="flex flex-col w-9/12">
                  <div className="flex flex-row space-x-3 mt-2">
                    <label className="text-xl font-sans font-semibold">
                      Attributes
                    </label>
                    <button onClick={addNewAttribute}>
                      <img src="add.svg" alt="" width="25px" />
                    </button>
                  </div>

                  {attributes.map((curr, idx) => {
                    return (
                      <div className="flex flex-row space-x-4 mb-4" key={idx}>
                        <input
                          type="text"
                          name="trait_type"
                          className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2"
                          onChange={(e) => handleAttributeInputChange(e, idx)}
                        />
                        <input
                          type="text"
                          name="trait_name"
                          className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2"
                          onChange={(e) => handleAttributeInputChange(e, idx)}
                        />
                        <button
                          onClick={() => deleteAttribute(idx)}
                          className="mt-1"
                        >
                          <img src="delete.svg" alt="" width="50px" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col">
                  <button
                    className="w-8/12 h-14 bg-gray-200 border-2 border-gray-300 rounded-xl text-base font-bold text-gray-700"
                    onClick={handleClick}
                    disabled={submitting}
                  >
                    {!submitting ? "Mint your NFT" : "Minting..."}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ShowToast />
      </main>
    </div>
  );
}
