import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ConnectWallet } from '../components/connect'
import SyncWallet from '../hooks/useZksync'
import Wallet from '../hooks/useWallet'
import { ShowToast } from '../components/toast'
import { showToast } from '../helpers/showToast'
import { useIPFS } from '../hooks/useIPFS'

export default function Explore() {
    const { provider } = Wallet.useContainer();
    const { nfts } = SyncWallet.useContainer();
    const { decodeMultihash } = useIPFS();
    const [ collection, setCollection ] = useState([]); 

    useEffect(() => {
        const verified = nfts.verified; 

        if(verified !== undefined) {
            let arr = []; 

            for(let [key, value] of Object.entries(verified)) {
                value.url = decodeMultihash(value.contentHash);
                arr.push(value);
            }

            console.log(arr)

            setCollection(arr);
        }
    }, [nfts]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>OpenSky</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <ConnectWallet />

        <Link href="/">
            <div className="flex flex-col absolute top-0 right-0 mt-8 mr-52">
                <button>
                    <img src="home.svg" alt=""></img>
                </button>
            </div>
        </Link>
  
        <main className="w-full flex-1 px-20 py-20 items-center justify-center flex">
            {
                provider ? 
                <div> 
                    <div>
                        <img src="view.svg" />
                    </div>
                    <div className="flex flex-row flex-wrap mt-6">
                        {
                            collection && collection.map((nft, idx) => {
                                return (
                                    <div key={idx} className="flex flex-col rounded-2xl shadow-xl overflow-hidden border border-gray-300 flex-shrink-0 mr-8 mb-8 w-64">
                                        <div className="flex justify-center items-center mt-6">
                                            <img src={nft.url} alt="" width={180}></img>
                                        </div>
                                        <div className="flex flex-col items-start p-4 text-sm text-gray-500">
                                            <div> 
                                                {
                                                    nft.symbol
                                                }
                                            </div>
                                            <div>
                                                {
                                                    `Creator ` + nft.creatorId
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> 
                : 
                <div>
                    <img src="view_connect.svg" className="" alt=""></img>
                </div>
            }
            
            <ShowToast />
        </main>
  
        <footer className="flex items-center justify-center w-full h-24 border-t">
          <p><b>Powered by ZKsync</b></p>
        </footer>
      </div>
    );
}