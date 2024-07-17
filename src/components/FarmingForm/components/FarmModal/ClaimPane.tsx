import { Row, Col, Spin, Button, message } from 'antd'
import styles from '../../FarmingForm.module.scss'
import { useStake } from '@src/hooks/useStake'
import { useFarmModal } from '@/hooks/useFarmModal';
import {useEffect, useState} from 'react'
import {formatEther} from '@src/utils'
import {useWallet} from '@src/hooks/useWallet'
export const ClaimPane = () => {
    const [claimLoading, setClaimLoading] = useState(false)
    const {
        earnedBre,
        signer,
        setDepositTokenAddress,
        setStakingAddress,
        setPoolId,
        updateBalanceInfo,
        withdraw
      } = useStake();
    
    const earnedBreInEther: number = formatEther(earnedBre).toFixed(4);
    
      const {
        farmFormInfo
    } = useFarmModal()

    const {
        available,
        poolId,
        chainId,
        earnedSymbol,
        stakingAddress,
        depositTokenAddress
    } = farmFormInfo || {}

    const {chain} = useWallet();
    
      useEffect(() => {
        setPoolId(poolId);
    }, []);

    function updateContracts() {
        if (chain?.chainId != chainId || !signer) {
            // clear contracts
            setStakingAddress('');
            setDepositTokenAddress('');
            return;
          }
          if (stakingAddress) {
            setStakingAddress(stakingAddress);
          }
          if (depositTokenAddress) {
            setDepositTokenAddress(depositTokenAddress);
          }
    }
    function onHarvestButtonClick() {
        if (!available) {
            return;
        }
        setClaimLoading(true)
        return withdraw(poolId, 0)
        .then((transaction) => {
            return transaction.wait();
        })
        .then(() => {
            setClaimLoading(false)
            message.success('Harvest success!');
            updateBalanceInfo();
        })
        .catch((e) => {
            setClaimLoading(false)
            console.error(e);
            let msg = e.msg;
            message.error('Harvest failed. ' + (msg || ''));
        })
    }

    useEffect(() => {
        updateContracts();
    }, [signer, chain])
    return (
        <Row gutter={[16, 16]}>
              <Col span={24}>
                <div style={{ textAlign: 'center', fontSize: '1.6em' }}>Reward</div>
              </Col>
              <Col span={24}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1.2em' }}>{earnedBre === null ? <Spin /> : earnedBreInEther} {earnedSymbol}</span>
                </div>
              </Col>
              <Col span={24}>
                <Button
                    size="large"
                    className={styles['button']}
                    onClick={onHarvestButtonClick}
                    style={{ width: '100%', margin: 10 }}
                    type="primary"
                    >
                    <Spin spinning={claimLoading}></Spin>Claim
                </Button>
              </Col>
            </Row>
    )
}