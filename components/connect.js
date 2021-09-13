import { useState, useEffect } from 'react'
import Wallet from '../hooks/useWallet'
import { cutAddress } from '../helpers/cutAddress';

export const ConnectWallet = () => {
    const { address, ensName, login, provider } = Wallet.useContainer(); 
    const [ buttonContent, setButtonContent ] = useState("Connect to wallet"); 
    const [ info, setInfo ] = useState("");

    useEffect(() => {
        if(ensName !== null){
            setButtonContent(ensName);
        }else if(address !== null){
            setButtonContent(cutAddress(address));
        }else{
            setButtonContent("Connect to wallet");
        }
    }, [address, ensName]);

    return(
        <div className="flex flex-col absolute top-0 right-0 mt-6 mr-6">
            <div>
                <button className="h-10 text-white font-medium pl-4 pr-4 w-40 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:opacity-90" onClick={() => login()}>
                    { 
                        buttonContent
                    }
                </button> 
            </div>
        </div>
    );
};