import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import * as zksync from "zksync";
import { ethers } from "ethers";
import Wallet from "./useWallet";
import { useIPFS } from "./useIPFS";
import { showToast } from "../helpers/showToast";

export const useZksync = () => {
  const { syncWallet, syncProvider } = Wallet.useContainer();
  const { uploadImage, uploadMetadata } = useIPFS();
  const [nfts, setNfts] = useState({});

  const getVerifiedBalance = async () => {
    if (syncWallet !== null) {
      const verifiedETHBalance = await syncWallet.getBalance("ETH", "verified");
      return ethers.utils.formatEther(verifiedETHBalance.toString());
    }
  };

  useEffect(() => {
    if (syncWallet !== null) {
      syncWallet.getAccountState(syncWallet.address()).then((state) =>
        setNfts({
          committed: state.committed.nfts,
          verified: state.verified.nfts,
        })
      );
    }
  }, [syncWallet]);

  const mint = async (itemName, externalUrl, description, file) => {
    if (syncProvider !== null && syncWallet !== null) {
      try {
        const fee = await syncProvider.getTransactionFee(
          "MintNFT",
          syncWallet.address(),
          "ETH"
        );
        const totalFee = fee.totalFee;

        const imageUrl = await uploadImage(file);

        const metadataContentHash = await uploadMetadata({
          itemName: itemName,
          externalUrl: externalUrl,
          description: description,
          file: imageUrl,
        });

        const nft = await syncWallet.mintNFT({
          recipient: syncWallet.address(),
          contentHash: metadataContentHash,
          feeToken: "ETH",
          fee: totalFee,
        });

        const receipt = await nft.awaitReceipt();

        showToast("Your NFT has been minted 😎");

        return receipt;
      } catch (error) {
        showToast(error);
      }
    } else {
      showToast("Not connected to a wallet");
    }
  };

  const findNFT = async (tokenId) => {
    return await syncWallet.getNFT(tokenId, 'verified');
  };

  const transferNFT = async (tokenId, address) => {
    if (syncProvider !== null && syncWallet !== null) {
      try {
        const nft = await findNFT(131464);

        console.log(nft)

        if (nft !== null) {
          console.log('1')
          const fee = await syncProvider.getTransactionFee(
            "MintNFT",
            syncWallet.address(),
            "ETH"
          );
          const totalFee = fee.totalFee;
          console.log('2')

          const transfer = await syncWallet.syncTransferNFT({
            to: "0x39f4f8a6012b62379bc4e82948a2a5F8D48c7E8d",
            token: nft,
            feeToken: "ETH",
            totalFee,
          });



          const receipt = await transfer[0].awaitReceipt();
        } else {
          showToast("NFT does not exist!");
        }
      } catch (error) {
        showToast(error.message);
      }
    }else{
      showToast("Wallet not connected");
    }
  };

  const buyNFT = async (tokenId, amount) => { 
    const nft = await findNFT(131468);

    try{
      await syncWallet.getOrder({
        tokenBuy: nft.id, 
        tokenSell: 'ETH', 
        ratio: zksync.utils.tokenRatio({
          ETH: 0.000001,
          [nft.id]: 1 
        }), 
        recipient: '0xbE694be8e812ae1a99443b32041142C36597A772'
      });
    }catch(error){
      showToast(error.message)
    }

  
  };

  const sellNFT = async () => {
    const nft = await findNFT(131468);

    try{
      await syncWallet.getOrder({
        tokenBuy: 'ETH', 
        tokenSell: nft.id, 
        ratio: zksync.utils.tokenRatio({
          ETH: 0.000001,
          [nft.id]: 1 
        })
      });
    }catch(error){
      showToast(error.message)
    }
  }

  return {
    mint,
    transferNFT,
    sellNFT,
    buyNFT, 
    nfts,
  };
};

// Export this container for global state
const SyncWallet = createContainer(useZksync);
export default SyncWallet;
