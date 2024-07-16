import Link from 'next/link';
import { Layout, Row, Col, Popover } from 'antd';
import styles from './AppFooter.module.scss';
const { Footer } = Layout;

const AppFooter = () => {
    const content = () => {
      return (
      <div>
        My Email: <a href="mailto:">mayz905383590@outlook.com</a>
      </div>
      )
    }
    return (
      <Footer style={{ textAlign: 'center' }} className={[styles.footer].join(' ')}>
          <Row className='main-content'>
            <Col span={ 6 } className={[styles['logo-container']].join(' ')}>
              {/* logo */}
              <Link href="/" className={styles.logo} style={{ cursor: 'pointer' }} />
            </Col>
            <Col span={ 6 }>
              <Link href="https://github.com/MaryZhen/LiquidYieldPool-frontend">GitHub</Link>
            </Col>
            <Col span={ 6 }>
              <Popover content={content} title="Contact me">
                <Link href="/">Contact me</Link>
              </Popover>
            </Col>
          </Row>
      </Footer>
    )
    
};
export default AppFooter;