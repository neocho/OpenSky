import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { injected } from '../helpers/connectors'


export function useEagerConnect() {
    const { activate, active } = useWeb3React(); 
    const [ tried, setTried ] = useState(false);

    useEffect(() => {
        const checker = async () => {
            const isAuthorized = await injected.isAuthorized();

            console.log("Eager isAuth: ", isAuthorized);

            if(isAuthorized){
                try{
                    await activate(injected, undefined, true);
                }catch(error){
                    console.log("Eager error: ", error);
                    setTried(true);
                }
            }else{
                setTried(true);
            }
        };

        checker(); 
    }, []);

    useEffect(() => {
        if(!tried && active) {
            setTried(true);
        }
    }, [tried, active]);

    console.log("Eager tried: ", tried)

    return tried;
}

export function useInactiveListener(suppress=false) {
    const { active, error, activate } = useWeb3React(); 

    useEffect(() => {

        const { ethereum } = window; 

        if (ethereum && ethereum.on && !active && !error && !suppress){
            const handleConnect = () => {
                activate(injected);
            }

            const handleChainChanged = (chainID) => {
                activate(injected);
            }

            const handleAccountsChanged = (accounts) => {
                if(accounts.length > 0){
                    activate(injected);
                }
            }

            const handleNetworkChanged = (networkId) => {
                activate(injected);
            }

            ethereum.on('connect', handleConnect);
            ethereum.on('chainChanged', handleChainChanged);
            ethereum.on('accountsChanged', handleAccountsChanged);
            ethereum.on('networkChanged', handleNetworkChanged);

            return () => {
                if(ethereum.removeListener) {
                    ethereum.removeListener('connect', handleConnect);
                    ethereum.removeListener('chainChanged', handleChainChanged);
                    ethereum.removeListener('accountsChanged', handleAccountsChanged);
                    ethereum.removeListener('networkChanged', handleNetworkChanged);
                }
            }
        }
    }, [active, error, suppress, activate])
}