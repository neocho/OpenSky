import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Modal from 'react-modal'
import { ConnectWallet } from '../components/connect'
import Wallet from '../hooks/useWallet'
import SyncWallet from '../hooks/useZksync'
import { ShowToast } from '../components/toast'
import { showToast } from '../helpers/showToast'

export default function Home() {
  const { provider } = Wallet.useContainer(); 
  const { mint } = SyncWallet.useContainer();

  const [ modalIsOpen, setIsOpen ] = useState(false);

  const [ receipt, setReceipt ] = useState(null);

  const [ itemName, setItemName ] = useState("");
  const [ externalUrl, setExternalUrl ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ file, setFile ] = useState(null);

  const [ submitting, setIsSubmitting ] = useState(false);

  const [ minting, setIsMinting ] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const changeItemName = (e) => setItemName(e.target.value);
  const changeExternalUrl = (e) => setExternalUrl(e.target.value);
  const changeDescription = (e) => setDescription(e.target.value);
  const changeFile = (file) => setFile(file);

  const handleClick = async () => {
    if(provider === null){
      showToast('Wallet is not connected');
      return;
    }

    setIsSubmitting(true);

    if(!itemName && !externalUrl && !description && file === null){
      showToast('Check your items input data!');
      setIsSubmitting(false);    
      return;
    }

    setIsMinting(true);

    try {
      const res = await mint(itemName, externalUrl, description, file);
      setReceipt(res);
    }catch(error){
      showToast(error.message)
    }
    
    setIsMinting(false);
    setIsSubmitting(false);    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>OpenSky</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConnectWallet />

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="ml-2">
          <img src="header2.svg" alt="" />
        </div>

        <div className="flex justify-around max-w-sm mt-8 sm:w-full">
          <img src="content2.svg" alt="" />
        </div>

        <div className="flex justify-around max-w-sm mt-8 sm:w-full">
          <Link href="/explore">
            <button className="h-14 text-white font-medium pl-6 pr-6 rounded-lg bg-gray-900 hover:opacity-90">
              Explore your NFTs
            </button> 
          </Link>
          <button className="h-14 text-white font-medium pl-6 pr-6 rounded-lg bg-gray-900 hover:opacity-90" onClick={openModal}>
            Mint your NFT
          </button> 
        </div>

        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={{ 
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
              }
            }}
          >
            <div className="">
              <div className="flex flex-row justify-between mb-4">
                <div><img src="mint_header.svg" alt="" width="140px" className="mt-1" /></div>
                <div>
                  <button onClick={closeModal}>
                    <img src="cross.svg" alt="" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <img src="instructions.svg" alt="" />
              </div>

              <div className="flex space-y-5 mt-4">
                <div className="space-y-5">
                  <div className="flex flex-col">
                    <img src="item_name.svg" width="85px" alt=""></img>
                    <input type="text" className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2" onChange={(e) => changeItemName(e)} />
                  </div>
                  <div className="flex flex-col">
                    <img src="external_link.svg" width="90px" alt=""></img>
                    <input type="text" className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2" onChange={(e) => changeExternalUrl(e)} />
                  </div>
                  <div className="flex flex-col">
                    <img src="description.svg" width="85px" alt=""></img>
                    <input type="text" className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2" onChange={(e) => changeDescription(e)} />
                  </div>
                  <div className="flex flex-col">
                    <img src="select_file.svg" width="78px" alt=""></img>
                    <input type="file" className="shadow w-full py-2 px-3 appearance-none text-gray-700 outline-none rounded-lg border-2 border-gray-600 mt-2" onChange={(e) => changeFile(e.target.files[0])} />
                  </div>
                  <div className="flex flex-col">
                    <button className="mt-2" onClick={handleClick} disabled={submitting}>
                      {
                        minting ? <img src="minting.svg" alt=""></img> : <img src="mint_button.svg" alt=""></img>
                      }                    
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <ShowToast />
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p><b>Powered by ZKsync</b></p>
      </footer>
    </div>
  )
}
