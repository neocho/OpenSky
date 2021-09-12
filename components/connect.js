import { useState, useEffect, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect } from '../hooks/useEagerConnect'
import { useInactiveListener } from '../hooks/useEagerConnect'
import { injected } from '../helpers/connectors'
import Web3Modal from 'web3modal';

export const ConnectWallet = () => {
    const { activate, active, connector, error , account, library, chainId } = useWeb3React();
    const [ activatingConnector, setActivatingConnector ] = useState(); 

    console.log("chainId: ", chainId);
    console.log("account: ", account);
    console.log("library: ", library);
    console.log("error: ", active);

    useEffect(() => {
        if(activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]); 

    const triedEager = useEagerConnect(); 

    console.log("TriedEager: ", triedEager);

    useInactiveListener(!triedEager || !!activatingConnector);

    const handleClick = () => {
        setActivatingConnector(connector);
        activate(injected);
    }

    const cutAddress = (account) => {
        return account.substring(0,6) + "..." + account.substring(account.length-5, account.length);
    }

    return(
        <div className="absolute top-0 right-0 mt-6 mr-6">
            <button className="h-10 text-white font-medium pl-4 pr-4 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:opacity-90" onClick={handleClick}>
                {
                    active ? cutAddress(account) : <p>Connect to wallet</p>
                }
            </button> 
        </div>
    );
};