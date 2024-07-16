import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import AirdropAbi from '@src/utils/abi/Airdrop.json'

import {AIRDROP_CONTRACT} from "@src/config";

export function useContract() {
    const AirdropAddress = AIRDROP_CONTRACT

    const { provider } = useWeb3React()
    // const privateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';
    // const wallet = new ethers.Wallet(privateKey);
    // const provider = new ethers.JsonRpcProvider('http://localhost:8545');
    // const signer = wallet.connect(provider);
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

