import { IconWalletButton } from "@src/components/Icons";
// import { useWallet } from '@src/hooks/useWallet';
import styles from './walletbutton.module.scss';
export default function WalletButton(props) {
    // const { walletAddress, showWallet } = useWallet();
    const walletAddress: string = ''
    return walletAddress ? 
    (<div 
        className={[styles['wallet-button'], props.className].join(' ')}
        onClick={()=> {}}
      >
      <IconWalletButton style={{verticalAlign:"text-bottom"}}></IconWalletButton> {walletAddress && walletAddress.replace(/^(.{6}).+(.{4})$/g, '$1...$2')}
      </div>)
    :
    (<div className={[styles['wallet-button'], props.className].join(' ')} onClick={()=> {}}>
      <IconWalletButton style={{verticalAlign:"text-bottom"}}></IconWalletButton> Connect Wallet
    </div>)
}