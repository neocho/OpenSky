import { useState, useEffect, useMemo, useCallback } from 'react'
import { ethers } from 'ethers'
import Onboard from 'bnc-onboard'
import { createContainer } from 'unstated-next'
import { Web3Provider } from '@ethersproject/providers'

const walletChoices = [
    { 
        walletName: 'metamask', 
        preferred: true 
    },
    { 
        walletName: 'walletConnect', 
        infuraKey: {
            ['1']: process.env.INFURA_KEY
        }
    }
];

const walletChecks = [
    { checkName: 'accounts' },
    { checkName: 'connect' },
];

export const useWallet = () => {
    const [ address, setAddress ] = useState(null);
    const [ provider, setProvider ] = useState(null); 
    const [ ensName, setEnsName ] = useState(undefined);

    const onboard = useMemo(() => {
        return Onboard({
            dappId: process.env.BLOCKNATIVE_KEY, 
            networkId: 1, 
            hideBranding: true, 
            walletSelect: {
                heading: "Connect to OpenSky 🌞☁️", 
                description: "Select a wallet", 
                wallets: walletChoices
            }, 
            subscriptions: {
                wallet: async (wallet) => {
                    if(wallet.provider) {
                        const provider = new ethers.providers.Web3Provider(wallet.provider);
                        setProvider(provider);
                    }else{
                        setAddress(null);
                        setProvider(null);
                    }
                }, 
                address: async (address) => {
                    if(address !== null){
                        setAddress(address);
                    }else{
                        setAddress(null);
                        setProvider(null);
                    }
                }, 
                ens: async (ens) => {
                    if(ens !==  undefined) {
                        setEnsName(ens.name);
                    }else{
                        setEnsName(null);
                    }
                }
            },
            walletCheck: walletChecks
        });
    }, []);

    const login = useCallback(async() => {
        await onboard.walletSelect(); 

        let connectionResult = null;

        try{
            connectionResult = await onboard.walletCheck(); 
        }catch(error){  
            console.log(error);
        }
    }, [onboard]);

    return {
        provider, 
        address, 
        ensName, 
        login
    };
};

// Export this container for global state
const Wallet = createContainer(useWallet);
export default Wallet; 
