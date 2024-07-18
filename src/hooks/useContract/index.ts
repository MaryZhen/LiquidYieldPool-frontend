// this is a hook to interact with the airdrop_contract,
// withdrawTokens allow you claim 100 c2m tokens at the first time
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import AirdropAbi from '@src/utils/abi/Airdrop.json'

import {AIRDROP_CONTRACT} from "@src/config";

export function useContract() {
    const AirdropAddress = AIRDROP_CONTRACT

    const { provider } = useWeb3React()
    const handleClaim = async ()=>{
        if(!provider){
            return;
        }
        const signer: any = provider.getSigner();
        const airdropContract = new ethers.Contract(AirdropAddress, AirdropAbi.abi, signer);
        await airdropContract.withdrawTokens();
    }
    return {
        handleClaim
    }
}

