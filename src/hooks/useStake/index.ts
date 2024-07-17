import {useState, useMemo, useEffect, use} from 'react'
import {ethers, Contract} from 'ethers'
import { useWeb3React } from '@web3-react/core'
import FarmingC2M from '@src/utils/abi/FarmingC2M.json'
import C2MToken from '@src/utils/abi/C2MToken.json'
import { useWallet } from '@src/hooks/useWallet'
import {
    AIRDROP_TOKEN,
} from '@src/config'
import { parseEther } from "@src/utils/index";
export function useStake(){
    const [ stakingAddress, setStakingAddress ] = useState<string>('')
    const [ depositTokenAddress, setDepositTokenAddress ] = useState<string>('')
    const [ poolId, setPoolId ] = useState('')
    const [ depositedAmount, setDepositedAmount ] = useState('')
    const [ poolInfo, setPoolInfo ] = useState(null)
    const [ balance, setBalance ] = useState(null);
    const [ allowance, setAllowance ] = useState();
    const [ signer, setSigner ] = useState<any>()
    const [ poolInfoTimer, setPoolInfoTimer ] = useState(null)
    const [ earnedBre, setEarnedBre ] = useState()
    const [rewardPerSecond, setRewardPerSecond] = useState();

    const { walletAddress } = useWallet()

    const { provider } = useWeb3React()
    const stakingContract = useMemo(() => {
        const signer: any = provider?.getSigner();
        if (stakingAddress && signer) {
            const stakingContract = new ethers.Contract(stakingAddress, FarmingC2M.abi, signer);
            return stakingContract;
        } else {
            return null;
        }
    }, [stakingAddress, provider])
    
    const depositTokenContract: Contract = useMemo(() => {
    const signer: any = provider?.getSigner();
    if (depositTokenAddress && signer) {
        const depositTokenContract = new Contract(AIRDROP_TOKEN, C2MToken.abi, signer);

        return depositTokenContract;
    } else {
        return null;
    }
    }, [depositTokenAddress, provider]);

    function getDeposited(pid, address) {
        if (!stakingContract || !address) {
          return;
        }
        const options = { nonce: 45, value: 0 };
        return (
          (stakingContract.deposited &&
            stakingContract
              .deposited(pid, address || walletAddress, options)
              .then(value => {
                console.info('执行这里的数据了啊啊啊啊啊==============', value)
                setDepositedAmount(value);
              })) ||
          Promise.reject()
        );
    }
    
    async function getPoolInfo() {
        if (!stakingContract) {
            return Promise.reject();
        }
        try {
            const ret = stakingContract.poolInfo && await stakingContract.poolInfo(poolId);
            setPoolInfo(ret);
        } catch (e) {
            console.error(e);
        }
    }
    async function getBalance(account) {
        if (!depositTokenContract || !account) {
            return Promise.reject();
        }
        try {
            const ret = depositTokenContract.balanceOf && await depositTokenContract.balanceOf(account);
            setBalance(ret);
        } catch (e) {
            console.error(e);
        }
        if (!stakingContract || !account) {
            return Promise.reject();
        }
        try {
            const earnedres = await stakingContract.pending(poolId, account)
            setEarnedBre(earnedres);
        } catch (e) {
            console.error(e);
        }
    }
      async function getAllowance(owner, spender) {
        if (!depositTokenContract || !owner || !spender) {
          return Promise.reject();
        }
        const options = {};
        const num =
          depositTokenContract.allowance &&
          (await depositTokenContract.allowance(owner, spender, options));
        setAllowance(num);
    }

    async function getRewardPerSecond() {
        if (!stakingContract) {
          return Promise.reject();
        }
        const options = {};
        try {
          const ret =
          stakingContract.rewardPerSecond &&
            (await stakingContract.rewardPerSecond());
            setRewardPerSecond(ret);
        } catch (e) {
          console.error(e)
        }
      }
    async function updateBalanceInfo() {
        return Promise.all([
            getBalance(walletAddress),
            getDeposited(poolId, walletAddress),
            getAllowance(walletAddress, stakingAddress)
        ])
        
    }

    function deposit(pid, amount) {
        if (!stakingContract) {
            return Promise.reject();
        }
        const options = {};
        if (!stakingContract.deposit) {
            return Promise.reject();
        }
        amount = parseEther(amount);
        return stakingContract.deposit(pid, amount, options).catch((e) => {
            throw e;
        });
    }

    async function approve(contractAddress, amount, decimals = 18) {
        if (!depositTokenContract) {
          return Promise.reject();
        }
        try {
            if (depositTokenContract.approve) {
                await depositTokenContract.approve(contractAddress, ethers.parseUnits('10000', 18));
                getAllowance(walletAddress, stakingAddress);
            }
        } catch(error) {
            return Promise.reject(error)
        }
          
      }
    
      async function withdraw(pid, amount) {
        if (!stakingContract) {
          return Promise.reject();
        }
        const options = {};
        amount = parseEther(amount);
        return (
          (stakingContract.withdraw &&
            await stakingContract.withdraw(pid, amount, options)) ||
          Promise.reject()
        );
      }

    useEffect(() => {
        depositTokenContract && stakingAddress && getAllowance(walletAddress, stakingAddress);
      }, [depositTokenContract, stakingAddress])

    useEffect(() => {
        poolId && stakingContract && getDeposited(poolId, walletAddress);
    }, [poolId, stakingContract, walletAddress]);

    useEffect(() => {
        stakingContract && getBalance(walletAddress);
    }, [depositTokenContract, walletAddress]);

    useEffect(() => {
        poolId !== '' && stakingContract && getPoolInfo();
    }, [poolId, stakingContract]);

    useEffect(() => {
        const signer: any = provider?.getSigner();
        setSigner(signer)
    }, [provider]);

    useEffect(() => {
        if (!stakingContract) {
          clearInterval(poolInfoTimer);
          return;
        }
        const timerFn = () => {
          getPoolInfo();
          getRewardPerSecond();
          updateBalanceInfo();
        };
        timerFn()
        const timer = setInterval(() => timerFn, 20000);
        setPoolInfoTimer(timer)
    
        return () => {
          clearInterval(poolInfoTimer);
        }
      }, [stakingContract])

    return {
        poolInfo,
        balance,
        stakingContract,
        depositTokenContract,
        depositedAmount,
        allowance,
        signer,
        earnedBre,
        setStakingAddress,
        setDepositTokenAddress,
        setPoolId,
        updateBalanceInfo,
        deposit,
        approve,
        withdraw
    }
}