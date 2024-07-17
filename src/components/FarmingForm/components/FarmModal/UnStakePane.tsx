import {Row, Col, Button, InputNumber, Spin, message} from 'antd'
import styles from '../../FarmingForm.module.scss'
import { useFarmModal } from '@/hooks/useFarmModal'
import { useResponsive } from '@/hooks/useResponsive'
import { useState, useEffect } from 'react'
import { useStake } from '@/hooks/useStake'
import { formatEther } from '@/utils'
import { useWallet } from '@/hooks/useWallet'
export const UnStakePane = () => {
    const [withdrawNum, setWithdrawNum] = useState<number>();
    const [unStakeLoading, setUnStakeLoading] = useState<boolean>(false);

    const {isDeskTop} = useResponsive()
    const {
        farmFormInfo
    } = useFarmModal()

    const {
        depositSymbol,
        available,
        poolId,
        chainId,
        stakingAddress,
        depositTokenAddress
    } = farmFormInfo

    const {
        balance,
        depositedAmount,
        signer,
        setPoolId,
        setStakingAddress,
        setDepositTokenAddress,
        updateBalanceInfo,
        withdraw
    } = useStake()

    const {
        chain
    } = useWallet();

    function maxNumber(num) {
        return num > 0.01 ? num - 0.01 : num;
    }
    
    function onWithdrawButtonClick() {
        if (!available) {
            return
        }
        setUnStakeLoading(true)
        return withdraw(poolId, withdrawNum).then((transaction) => {
          return transaction.wait();
        }).then(() => {
          setUnStakeLoading(false)
          message.success('Withdraw success!');
          setWithdrawNum(0);
          updateBalanceInfo();
        })
        .catch((e) => {
          console.error(e);
          let msg = e.msg;
          message.error('Withdraw failed. ' + (msg || ''));
          setUnStakeLoading(false)
        })
    }

    function updateContracts() {
        if (chain?.chainId != chainId || !signer) {
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
      <Row gutter={[16, 16]}>
        <Col span={isDeskTop ? 24 : 24}>
          <Row justify="space-between">
              <div className="balance">
                  Balance: {formatEther(balance)?.toFixed(4)  || '-'} {depositSymbol}
              </div>
            <div className={styles['max']} onClick={() => {
              const res = maxNumber(formatEther(depositedAmount)).toFixed(4)
              setWithdrawNum(res)
            }}>MAX</div>
          </Row>
        </Col>
        <Col span={24}>
          <div className={styles['input']}>
            <InputNumber
              className={styles['number']}
              value={withdrawNum}
              max={formatEther(depositedAmount, 4)}
              step="0.0001"
              onChange={value => setWithdrawNum(value > 0 ? value : '')}
              stringMode
              controls={false}
              variant="borderless"
            />
            <div className={styles['unit']}>{depositSymbol}</div>
          </div>
        </Col>
        <Col span={24}>
          <Button
              size="large"
              className={styles['button']}
              onClick={ onWithdrawButtonClick }
              style={{ width: '100%', margin: 10 }}
              type="primary"
              >
              <Spin spinning={unStakeLoading}></Spin>Unstake
          </Button>
        </Col>
      </Row>
    )
}