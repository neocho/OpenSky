import { useWeb3React } from '@web3-react/core'
import * as zksync from "zksync";
import { ethers } from 'ethers';

export const mintNft = async(library) => {
    const syncProivder = await zksync.getDefaultProvider(library.proivder);



}