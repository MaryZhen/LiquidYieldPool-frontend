import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect'
// import { URLS } from './chains'
import { TrustWallet } from "@trustwallet/web3-react-trust-wallet";


const onError = (error) => {
    console.log(error);
}
const [web3Injected, web3InjectedHooks] = initializeConnector((actions) => new MetaMask({actions, onError}))
const [walletConnect, walletConnecthooks] = initializeConnector<WalletConnect>((actions) => new WalletConnect({ actions, options: { qrcode: true, rpc: ''}}))
// const [bsc, bscHooks] = initializeConnector<BSC>((actions) => new BSC({ actions, chainId: 56, urls: URLS[56] }))
// const [bscTestnet, bscTestHooks] = initializeConnector<BSC>((actions) => new BSC({ actions, chainId: 97, urls: URLS[97] }))
// const[blocto, bloctoHooks] = initializeConnector
const [trustWallet, trustwallethooks] = initializeConnector<TrustWallet>(
    (actions) => new TrustWallet({ actions })
);
const WalletConnectConnection = {
    connector: walletConnect,
    hooks: walletConnecthooks,
    type: 'walletconnect'
}
const InjectedConnectionMetaMask = {
    connector: web3Injected,
    hooks: web3InjectedHooks,
    type: 'MetaMask'
}
const TruthWalletConnection = {
    connector: trustWallet,
    hooks: trustwallethooks,
    type: 'trustwallet'
}   

export const connections = [InjectedConnectionMetaMask, WalletConnectConnection, TruthWalletConnection]

export const connectors = connections.map(({hooks, connector}) => [connector, hooks])