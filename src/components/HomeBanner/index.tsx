import styles from './HomeBanner.module.scss'
import { Row, Col } from 'antd'
import { useResponsive } from '@src/hooks/useResponsive'
// import { IconC2n } from '../Icons'
import { tokenInfo } from '@src/config'
import { useContract } from '@src/hooks/useContract'
import { useWallet } from '@src/hooks/useWallet'
import { message } from 'antd'

export function Header() {
    const { isDeskTop } = useResponsive()
    const { handleClaim } = useContract();
    const token = tokenInfo
    const { chain } = useWallet()
    const addToken = async (tokenAddress, symbolName) => {
        if (!chain) {
            message.error('connect wallet and try again !')
            return
        }
        await (window as any).ethereum && (window as any).ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20", // Initially only supports ERC20, but eventually more!
                options: {
                address: tokenAddress, // The address that the token is at.
                symbol: symbolName, // A ticker symbol or shorthand, up to 5 chars.
                decimals: 18, // The number of decimals in the token
                image: '',
                }
            }
        });
    }
    return (
        <div className={styles['home-banner']}>
            <Row justify="space-between" align="middle" className={styles['main']}>
                <Col span={isDeskTop ? 16 : 24}>
                    <Row gutter={16}>
                    <Col span={isDeskTop ? 4 : 24}>
                        <Row justify="center" align="middle">
                            <div className={styles.icon}>C2M</div>
                        </Row>
                    </Col>
                    <Col span={isDeskTop ? 20 : 24}>
                        <Row>
                        <Col span={24} className={styles['text1']}>
                            {token.symbol} Tokens Online Now!
                        </Col>
                        <Col className={styles['text2']}>
                            Contract Address: &nbsp;
                            {
                                isDeskTop ? <></> : <br />
                            }
                            {token.address}
                        </Col>
                        </Row>
                    </Col>
                    </Row>
                </Col>
                <Col span={isDeskTop ? 4 : 12}>
                    <div className={styles['button']}
                    onClick={handleClaim}
                    >
                    Claim {token.symbol}
                    </div>
                </Col>
                <Col span={isDeskTop ? 4 : 12}>
                    <div className={styles['button']}
                    onClick={() => {
                        addToken(token.address, token.symbol)
                    }}
                    >
                    Add {token.symbol} to Wallet
                    </div>
                </Col>
                </Row>
        </div>
    )
}
export default Header