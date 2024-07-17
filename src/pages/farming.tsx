import styles from './farming.module.scss'
import { Row, Col } from 'antd'
import { useResponsive } from '@/hooks/useResponsive'
import farmConfigs from '@src/config/farm'
import { FarmingForm } from '@/components/FarmingForm'
import { useFarmModal } from '@/hooks/useFarmModal';
import { useMemo } from 'react'
export default function Farming() {
    const { isDeskTop } = useResponsive()
    const {setFarmFormInfo} = useFarmModal();
    useMemo(() => {
        setFarmFormInfo(farmConfigs[0])
    }, [])
    return (
      <main className={styles['container'] + " container"}>
        <section className={styles['intro'] + ' main-content'}>
          <Row justify="space-between">
            <Col>
              <span className={styles['stake-title']}>Yield Farms</span>
            </Col>
          </Row>
          <div className={styles['stake-subtitle']}>
            Yield Farms allow users to earn Reward token while supporting C2M by staking LP Tokens.
          </div>
        </section>
        <section className={styles['staking']}>
        <div className="main-content">
          <Row gutter={32}>
            {
              farmConfigs.map((item, index) => {
                return (
                  <Col span={isDeskTop ? 24 : 24}
                    key={index}
                  >
                    <FarmingForm
                      chainId={item.chainId}
                      depositTokenAddress={item.depositTokenAddress}
                      earnedTokenAddress={item.earnedTokenAddress}
                      stakingAddress={item.stakingAddress}
                      poolId={item.poolId}
                      available={item.available}
                      depositSymbol={item.depositSymbol}
                      earnedSymbol={item.earnedSymbol}
                      title={item.title}
                      depositLogo={item.depositLogo}
                      earnedLogo={item.earnedLogo}
                      getLptHref={item.getLptHref}
                      aprRate={item.aprRate}
                      aprUrl={item.aprUrl}
                    ></FarmingForm>
                  </Col>
                )
              })
            }
          </Row>
        </div>
      </section>

      </main>
    )
  }