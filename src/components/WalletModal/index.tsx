import { Modal, Button, Card, Row, Col, Space } from 'antd';
import styles from './walletmodal.module.scss'
import { useWallet } from "@src/hooks/useWallet";
import BasicButton from '../BasicButton';
// import styles from './WalletModal.module.scss'
import { IconAccount, IconNetwork } from '@src/components/Icons';
import { useAuth } from '@src/hooks/useAuth';
import connectors, { ConnectorNames } from '@src/types/connector';

export default function WalletModal() {
    const {
        showWallet, // a function set iswalletshow to true or false
        iswalletshow, // a boolean value to show or hide the modal
        chain,
        validChains,
        switchNetwork
    } = useWallet()

    const {
        account,
        login,
        logout
    } = useAuth()

    const onCancel = () => {
        showWallet(false)
    }
    const walletTitle = typeof window !== 'undefined' && window.localStorage.getItem('connectorID');
    const accountPanel = (
      <div style={{ width: '100%' }}>
        <Row justify="center">
          <div className={styles['title']}>
            Connected With {walletTitle}
          </div>
        </Row>
        <Row>
          <Col span={2}>
            <IconAccount />
          </Col>
          <Col span={12} style={{color: '#505050'}}>
            Current Account: 
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={2} style={{fontSize:'14px', color: '#000000'}}>
            <p>{account}</p>
          </Col>
        </Row>
        <Row>
          <Col span={2}>
            <IconNetwork />
          </Col>
          <Col span={12} style={{color: '#505050'}}>
            Current Network: 
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={2} style={{fontSize:'14px', color: '#000000'}}>
            <p>{chain&&chain.name}</p>
          </Col>
        </Row>
        <Row justify="center">
          <BasicButton className={styles['connect-button']} 
            style={{width: '100%'}}
            onClick={logout}
            >
              <span>Disconnect</span>
          </BasicButton>
        </Row>
      </div>
    )
    const wrongNetworkPanel = (<>
      <Row justify="center" align="middle">
        <div className={styles['title']}>
          Wrong Network
        </div>
      </Row>
      <Row justify="space-between" align="middle">
        <p>
          You are not currently connected to <b>{validChains && validChains[0].name}</b>.
          Please switch networks to use this application.
        </p>
      </Row>
      <Row justify="center">
        <BasicButton className={styles['connect-button']} 
          style={{width: '100%'}}
          onClick={switchNetwork}>
            <span>Switch Network</span>
        </BasicButton>
      </Row>
      </>
    )
    const connectPanel = (
        <div>
          <Row justify="start">
            <div className={styles['title']}>
              Connect wallet
            </div>
          </Row>
          <Row className={styles['connect-panel']} justify="center" gutter={[16, 24]}>
            {
            connectors.map((connector, index) => {
              return (
                  <Col className={styles['connect-button']} span={24} key={index}
                    onClick={() => {
                      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
                      // Since iOS does not support Trust Wallet we fall back to WalletConnect
                      if (connector.title === "Trust Wallet" && isIOS) {
                        login(ConnectorNames.WalletConnect);
                      } else {
                        login(connector.connectorId);
                      }
                      showWallet(false);
                    }}>
                      <connector.icon className={
                        [styles['icon']].join(' ')
                      }></connector.icon>
                      <span style={{
                        fontSize: '18px',
                        color: '#000000',
                        marginLeft: '12px'
                      }}>{connector.title}</span>
                  </Col>
              )
            })
          }
          </Row>
        </div>
    )
    return (
    <>
        <Modal 
        title={ null }
        open={ iswalletshow }
        onCancel={ onCancel }
        footer={null}
        >
            { account ? (chain ? accountPanel : wrongNetworkPanel) : connectPanel }
        </Modal>
    </>
    )
}