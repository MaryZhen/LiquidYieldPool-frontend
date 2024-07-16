import Link from 'next/link'
import Header from '@src/components/HomeBanner'
import { Row, Col } from 'antd'
import styles from './index.module.scss'
import { useResponsive } from '@src/hooks/useResponsive'
export default function Page() {
  const { isDeskTop } = useResponsive()
  return (
    <section className={styles.container}>
      <div className="main-content" style={{height: 'auto'}}>
        <Header />
        <Row>
          <Col span={isDeskTop ? 15 : 24}>
            <h1 className={styles.title}>
              C2M: Focused on dApp development feature presentation.
            </h1>
            <div className={styles.desc} style={{ marginBottom: '20px' }}>
              C2M is a showcase of common features for dApp development, including connecting to wallets, switching networks, claiming airdropped tokens and adding them to wallets, staking, receiving rewards, unstaking, and claiming rewards, among other common business presentations.
            </div>
            <Link href="/farming">
              <div className={styles['button'] + ' button'}>Farm</div>
            </Link>
          </Col>
          <Col span={isDeskTop ? 9 : 0}>
            {
              isDeskTop
                ? <div className={styles.banner}></div>
                : <></>
            }
          </Col>
        </Row>
      </div>
    </section>
  )
}