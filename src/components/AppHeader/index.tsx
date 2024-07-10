import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout, Row, Col, Menu, Dropdown } from 'antd';
import styles from './AppHeader.module.scss'
import Link from 'next/link'
import WalletButton from '../WalletButton';
import NetworkButton from '../NetworkButton';
import { MenuOutlined } from '@ant-design/icons'
import { useResponsive } from '@/hooks/useResponsive';
const { Header, Sider } = Layout;
const AppHeader = () => {
  const { isDeskTop } = useResponsive()
  const [showSider, setShowSider] = useState(false);
  const router = useRouter()
  let activeTabIndex = useMemo(() => {
    const pathArr: string[] = ['/', '/farming']
    return pathArr.findIndex(item => item === router.pathname)
  }, [router])
  const menu = (
    <Menu style={{ background: '#000000', border: '2px solid #FFB85280' }}>
      <div className={[styles['menu-item']].join(' ')}>
        <Link href="/">
          <div className={[styles.button, activeTabIndex === 0 ? styles['active'] : ''].join(' ')}>Home</div>
        </Link>
      </div>
      <div className={[styles['menu-item']].join(' ')}>
        <Link href="/farming">
          <div className={[styles.button, activeTabIndex === 1 ? styles['active'] : ''].join(' ')}>Farm</div>
        </Link>
      </div>
      <div className={[styles['menu-item']].join(' ')}>
        <WalletButton
          className={styles['wallet-button-mobile']}
          style={{ background: 'none', 'boxShadow': 'none' }}
        ></WalletButton>
      </div>
    </Menu>
  )
  return(
    <Header className={[styles.appheader].join(' ')}>
        <Row className="main-content">
          <Col span={ 6 } className={[styles['logo-container']].join(' ')}>
            {/* logo */}
            <Link href="/" className={styles.logo} style={{ cursor: 'pointer' }} />
          </Col>
          <Col span={ isDeskTop ? 18 : 4 } offset={ isDeskTop ? 0 : 14 }>
            {isDeskTop ? (<Row className={styles.menu} key="desktop" align={'middle'}>
              <Col span={ 12 } style={{ display: 'flex', justifyContent: 'start' }}>
                <Link href="/">
                  <div className={[styles.button, activeTabIndex == 0 ? styles['active'] : ''].join(' ')}>Home</div>
                </Link>
                <Link href="/farming">
                  <div className={[styles.button, activeTabIndex == 1 ? styles['active'] : ''].join(' ')}>Farm</div>
                </Link>
              </Col>
              <Col span={ 12 } style={{ display: 'flex', justifyContent: 'end' }}>
                <WalletButton />
                <NetworkButton />
              </Col>
            </Row>) : (
              <>
                <Row justify="end" align="middle" style={{ width: '100%', height: '100%' }}>
                  <MenuOutlined style={{ fontSize: '0.36rem' }} onClick={() => setShowSider(!showSider)}>
                  </MenuOutlined>
                </Row>
                <Sider
                  collapsed={!showSider}
                  collapsedWidth={0}
                  theme="light"
                  onClick={() => setShowSider(!showSider)}
                  style={{ 'position': 'fixed', 'right': '0', 'textIndent': '1em', 'zIndex': '100' }}>
                  {menu}
                </Sider>
                <div className={styles['sider-background']} onClick={() => setShowSider(!showSider)} style={{ display: showSider ? 'block' : 'none' }}>
                  &nbsp;
                </div>
              </>
            )}
          </Col>
        </Row>
    </Header>
  )
}
export default AppHeader;