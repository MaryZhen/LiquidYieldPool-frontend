import { useEffect } from 'react'
import { message } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useWeb3React } from '@web3-react/core'
import {
    selectWallet,
    selectwalletchain,
    setWalletShow,
    setWalletChain
} from "@src/redux/modules/wallet";
import {
    selectWalletAddress,
    setWalletAddress
} from "@src/redux/modules/contract";

import chains from '@src/utils/chains.json'
import {VALID_CHAINS} from '@src/utils/validnet'
// function checkMetaMask() {
//     return (window as any)?.ethereum?.isMetaMask;
// }
export function useListenToWallet() {
    const dispatch = useDispatch();
    let walletAddress = useSelector(selectWalletAddress);
  
    const { chainId, account } = useWeb3React()
    console.info('chainId', chainId)
  
    useEffect(() => { // watch the chain change
      handleChainChanged(chainId);
    }, [chainId]);
    useEffect(() => { // watch the account change
        handleAccountsChanged(account)
      }, [account]);

    const handleAccountsChanged = async (account) => {
        if (!account) {
          // MetaMask is locked or the user has not connected any accounts
          // message.warning('Please connect to your wallet.');
          dispatch(setWalletAddress(null));
        } else if (account !== walletAddress) {
          // Do any other work!
          dispatch(setWalletAddress(account));
          message.success({
            content: 'You have connected to account ' + account,
            duration: 1
          });
        }
      }
  
    const handleChainChanged = (chainId) => {
      const chain = chains.find(v => v.chainId == chainId); // 这里不能使用VALID_CHAINS,因为这个里面的对象属性logo是个函数，无法序列化
      dispatch(setWalletChain(chain));
    }
    return;
}
export const useWallet = () => {
    const walletAddress: string = useSelector(selectWalletAddress);
    const iswalletshow: boolean = useSelector(selectWallet);
    const chain = useSelector(selectwalletchain)
    const dispatch = useDispatch();
    function showWallet(value: boolean) {
        dispatch(setWalletShow(value));
        return;
    }

    async function switchNetwork(chainId: number) {
      console.log('you clicked the button of switch network!', chainId)
      if (!walletAddress) {
        console.warn('no wallet address', walletAddress)
      }
      const chain = chains.find(chain => chain.chainId == chainId) || VALID_CHAINS[0];
      const params = [
        {
          chainId: `0x${chain.chainId.toString(16)}`,
          chainName: chain.name,
          nativeCurrency: {
            name: chain.nativeCurrency.name,
            symbol: chain.nativeCurrency.symbol,
            decimals: chain.nativeCurrency.decimals,
          },
          rpcUrls: chain.rpc,
          blockExplorerUrls: [`${chain.infoURL}/`],
        },
      ];
      try {
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + (chain.chainId).toString(16) }],
        });
      } catch (switchError) {
        console.log('error')
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await (window as any).ethereum.request({
              method: 'wallet_addEthereumChain',
              params: params,
            });
          } catch (addError) {
            console.warn('addError', addError)
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    }

    const walletres = {
        iswalletshow,
        walletAddress,
        chain,
        validChains: VALID_CHAINS,
        showWallet,
        switchNetwork
    }
    return walletres;
}