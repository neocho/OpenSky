import Head from 'next/head'
import { useState } from 'react';
import { ConnectWallet } from '../components/connect'
import Modal from 'react-modal'
import { mintNft } from '../helpers/mint_nft';

export default function Home() {
  const [ modalIsOpen, setIsOpen ] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '40px',
      borderRadius: '20px', 
      borderColor: '#E3E3E3'
    },
  }

  const handleClick = async () => {
    await mintNft();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>OpenSky</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConnectWallet />

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="ml-8">
          <img src="header.svg" alt="" />
        </div>

        <div className="flex justify-around max-w-sm mt-3 sm:w-full">
          <img src="content.svg" alt="" />
        </div>

        <div className="flex justify-around max-w-sm mt-8 sm:w-full">
            <button className="h-14 text-white font-medium pl-12 pr-12 rounded-lg bg-gray-900 hover:opacity-90">
              Explore
            </button> 
            <button className="h-14 text-white font-medium pl-6 pr-6 rounded-lg bg-gray-900 hover:opacity-90" onClick={openModal}>
              Mint your NFT
            </button> 
        </div>

        <div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <div className="">
              <div className="mb-6 w-28">
                <img src="mint_header.svg" alt="" />
              </div>

              <div className="flex">
                <form className="space-y-5">
                  <div className="flex flex-col">
                    <img src="item_name.svg" width="90px" alt=""></img>
                    <input className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2"></input>
                  </div>
                  <div className="flex flex-col">
                    <img src="external_link.svg" width="90px" alt=""></img>
                    <input className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2"></input>
                  </div>
                  <div className="flex flex-col">
                    <img src="description.svg" width="90px" alt=""></img>
                    <input className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2"></input>
                  </div>
                  <div>
                    <button className="mt-2" onClick={handleClick}>
                      <img src="mint_button.svg" alt=""></img>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </Modal>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p><b>Powered by ZKsync</b></p>
      </footer>
    </div>
  )
}
