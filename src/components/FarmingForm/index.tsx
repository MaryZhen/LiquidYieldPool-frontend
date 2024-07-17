import styles from './FarmingForm.module.scss'
import { useMemo, useState, useEffect } from 'react'
import {useWallet} from '@src/hooks/useWallet'
import { Card, Row, Col, Spin, Button } from 'antd'
import { useStake } from '@src/hooks/useStake'
import {seperateNumWithComma, formatEther} from '@src/utils'
import { useResponsive } from '@/hooks/useResponsive'
import FarmModal from './components/FarmModal'
import { useFarmModal } from '@/hooks/useFarmModal';


type FarmingFormProps = {
    chainId,
    depositTokenAddress,
    earnedTokenAddress,
    stakingAddress,
    poolId,
    available,
    depositSymbol,
    earnedSymbol,
    title,
    depositLogo,
    earnedLogo,
    getLptHref,
    aprRate,
    aprUrl
  }

const CardMask = ({ chainId }) => {
    const {
        chain,
      } = useWallet();
    const isChainAvailable = useMemo(() => {
        return chain?.chainId == chainId;
      }, [chain])
    return (
        isChainAvailable ?
        (<></>) :
        (<div className={styles['mask']}></div>)
    )
}
export function FarmingForm(props: FarmingFormProps) {
    const {
        poolInfo,
        balance,
        depositedAmount,
        signer,
        earnedBre,
        setPoolId,
        setStakingAddress,
        setDepositTokenAddress
    } = useStake();

    const {isDeskTop} = useResponsive()

    const {
        chain,
      } = useWallet();

    function updateContracts() {
        if (chain?.chainId != props.chainId || !signer) {
          // clear contracts
          setStakingAddress('');
          setDepositTokenAddress('');
          return;
        }
        if (props.stakingAddress) {
          setStakingAddress(props.stakingAddress);
        }
        if (props.depositTokenAddress) {
          setDepositTokenAddress(props.depositTokenAddress);
        }
    }

    const depositedAmountInEther: number = formatEther(depositedAmount)?.toFixed(4) || 0;
    const earnedBreInEther: number = formatEther(earnedBre).toFixed(4);
    const [apr, setApr] = useState<any>('**');

    const totalDeposits = useMemo(() => {
        if (poolInfo) {
          return poolInfo.totalDeposits || 0;
        } else {
          return 0;
        }
      }, [poolInfo])

    const { setFormVisible, setActiveTabKey } = useFarmModal()

    function claimbtnClick() {
        if (props.available) {
            setFormVisible(true)
            setActiveTabKey('2')
        }
    }
    
    useEffect(() => {
        setPoolId(props.poolId);
    }, []);

    useEffect(() => {
        updateContracts();
    }, [signer, chain])

    
    return(
        <>
        <Card title={props.title} bordered={false} style={{ width: '100%', marginTop: 10 }}>
            <CardMask chainId={props.chainId} />
            <Row className={styles['apy']} justify="center">
                {apr === null ? <Spin /> : <>{apr || '-'} %</>}
            </Row>
            <Row className={styles['apy-extra']} justify="center">
                APR
            </Row>
            <div className={styles['records']}>
                <Row>
                    <Col span={isDeskTop ? 11 : 24}>
                        <Row className={styles['record']} justify="space-between">
                            <Col className={styles['record-label']}>
                                Earned
                            </Col>
                            <Col className={styles['record-value']}>
                                {props.earnedSymbol}
                            </Col>
                        </Row>
                        <Row className={styles['record']} justify="space-between">
                            <Col className={styles['record-label']}>
                                Total staked
                            </Col>
                            <Col className={styles['record-value']}>
                                {poolInfo === null ? <Spin /> : seperateNumWithComma(formatEther(totalDeposits).toFixed(2))} {props.depositSymbol}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={isDeskTop ? 11 : 24} offset={isDeskTop ? 2 : 0}>
                        <Row className={styles['record']} justify="space-between">
                            <Col className={styles['record-label']}>
                                My staked
                            </Col>
                            <Col className={styles['record-value']}>
                                {depositedAmount === null ? <Spin /> : depositedAmountInEther} {props.depositSymbol}
                            </Col>
                        </Row>
                        <Row className={styles['record']} justify="space-between">
                            <Col className={styles['record-label']}>
                                Available
                            </Col>
                            <Col className={styles['record-value']}>
                                {balance === null ? <Spin /> : (formatEther(balance)?.toFixed(4) || 0)} {props.depositSymbol}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={isDeskTop ? 11 : 24}>
                        <Row className={styles['record']} justify="space-between">
                            <Col className={styles['record-label']}>Rewards</Col>
                            <Col className={styles['record-value']}>
                                {earnedBre === null ? <Spin /> : earnedBreInEther} {props.earnedSymbol} &nbsp;
                            <span
                                onClick={claimbtnClick}
                                className={styles['link']}
                                style={{ background: '#DEDEDE', color: '#707070' }}
                            >
                                Claim
                            </span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={isDeskTop ? 11 : 24} offset={isDeskTop ? 2 : 0}>
                        <Row className={styles['record']} justify="space-between">
                            <Col className={styles['record-label']}>
                                { props.title }
                            </Col>
                            <Col className={styles['record-value']}>
                            <a href='/'
                                className={styles['link']}
                                style={{ background: '#D9EE77' }}
                            >
                                GET {props.depositSymbol}
                            </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div style={{textAlign: 'center', width: '100%'}}>
                <Button
                    size="large"
                    className={styles['button']}
                    onClick={() => { setFormVisible(true) }}
                    style={{ width: '200px', margin: 10 }}
                    type="primary"
                    >
                    Stake
                </Button>
            </div>
        </Card>
        <FarmModal />
        </>
    )
}