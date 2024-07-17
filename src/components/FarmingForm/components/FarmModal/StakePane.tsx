import {Row, Col, InputNumber, Button, message, Spin} from 'antd'
import { useResponsive } from '@/hooks/useResponsive'
import { formatEther } from '@src/utils'
import { useFarmModal } from '@/hooks/useFarmModal';
import styles from '../../FarmingForm.module.scss'
import { useStake } from '@src/hooks/useStake'
import { useState, useEffect } from 'react'
import { useWallet } from '@/hooks/useWallet';

export function StakePane() {
    const { isDeskTop } = useResponsive()
    const {
        farmFormInfo
    } = useFarmModal()
    const {
        poolId,
        chainId,
        available,
        depositSymbol,
        stakingAddress,
        depositTokenAddress
    } = farmFormInfo || {}
    const {chain} = useWallet();
    const {
        balance,
        signer,
        updateBalanceInfo,
        approve,
        deposit,
        setPoolId,
        setStakingAddress,
        setDepositTokenAddress
    } = useStake();

    const [depositNum, setDepositNum] = useState<number>();
    const [stakeLoading, setStakeLoading] = useState(false)
    function maxNumber(num) {
        return num > 0.01 ? num - 0.01 : num;
    }
    async function onStakeButtonClick() {
        if (!available) {
            return;
        }
        if (depositNum == 0) {
          return;
        }
        await updateBalanceInfo();
        if (depositNum > formatEther(balance)) {
            message.error(`Not enough ${depositSymbol} to stake!`);
          return;
        }
        setStakeLoading(true)
        return approve(stakingAddress, depositNum)
          .then((txHash) => {
            return deposit(poolId, depositNum)
              .then((transaction) => {
                return transaction.wait();
              })
              .then(() => {
                setStakeLoading(false)
                message.success('Congratulations, you have successfully deposited ' + depositNum + ' ' + depositSymbol);
                setDepositNum(0);
                updateBalanceInfo();
              })
              .catch(e => {
                throw e;
              })
          })
          .catch(() => {
            const msg = 'Approve amount should be greater than staking amount!';
            message.error('Stake failed. ' + (msg || ''));
            updateBalanceInfo();
          })
      }
    
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

    useEffect(() => {
        setPoolId(poolId);
    }, []);

    useEffect(() => {
        updateContracts();
    }, [signer, chain])

    return (
        <Row justify="space-between" gutter={[16, 16]}>
              <Col span={isDeskTop ? 24 : 24}>
                <Row justify="space-between">
                  <div className="balance">
                    {
                        <>Balance: {formatEther(balance)?.toFixed(4)  || '-'} {depositSymbol}</>
                    }
                  </div>
                  <div className={styles['max']} onClick={() => setDepositNum(maxNumber(formatEther(balance)))}>MAX</div>
                </Row>
              </Col>
              <Col span={isDeskTop ? 24 : 24}>
                <div className={styles['input']}>
                  <InputNumber
                    className={styles['number']}
                    value={depositNum}
                    max={formatEther(balance)}
                    step="0.0001"
                    onChange={value => setDepositNum(value > 0 ? value : '')}
                    stringMode
                    controls={false}
                    variant="borderless"
                  />
                  <div className={styles['unit']}>{depositSymbol}</div>
                </div>
              </Col>
              <Col span={isDeskTop ? 24 : 24}>
                <Button
                    size="large"
                    className={styles['button']}
                    onClick={() => { onStakeButtonClick() }}
                    style={{ width: '100%', margin: 10 }}
                    type="primary"
                    >
                        <Spin spinning={stakeLoading}></Spin>Stake
                </Button>
              </Col>
            </Row>
    )
}