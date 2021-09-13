import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import * as zksync from 'zksync'
import { ethers } from 'ethers'
import Wallet from './useWallet'
import { useIPFS } from './useIPFS'
import { showToast } from '../helpers/showToast'

export const useZksync = () => {
    const { syncWallet, syncProvider } = Wallet.useContainer();
    const { uploadImage, uploadMetadata } = useIPFS(); 
    const [ nfts, setNfts ] = useState({});

    const getVerifiedBalance = async() => {
        if(syncWallet !== null){
            const verifiedETHBalance = await syncWallet.getBalance("ETH", "verified");
            return ethers.utils.formatEther(verifiedETHBalance.toString());
        }
    };

    useEffect(() => {
        if(syncWallet !== null) {
            syncWallet.getAccountState(syncWallet.address()).then(state => setNfts({
                committed: state.committed.nfts, 
                verified: state.verified.nfts
            }))
        }
    }, [syncWallet]);

    const mint = async(itemName, externalUrl, description, file) => {
        if(syncProvider !== null && syncWallet !== null) {
            try{
                const fee = await syncProvider.getTransactionFee("MintNFT", syncWallet.address(), "ETH"); 
                const totalFee = fee.totalFee; 

                const imageUrl = await uploadImage(file);

                const metadataContentHash = await uploadMetadata({
                    itemName: itemName, 
                    externalUrl: externalUrl, 
                    description: description, 
                    file: imageUrl
                });
                
                const nft = await syncWallet.mintNFT({
                    recipient: syncWallet.address(),
                    contentHash: metadataContentHash, 
                    feeToken: 'ETH', 
                    fee: totalFee
                });

                const receipt = await nft.awaitReceipt();

                showToast('Your NFT has been minted 😎'); 

                return receipt;
            }catch(error){
                showToast(error);
            }
        }else{
            showToast('Not connected to a wallet')
        }
    };

    return {
        mint, 
        nfts
    };
};

// Export this container for global state
const SyncWallet = createContainer(useZksync);
export default SyncWallet; 
