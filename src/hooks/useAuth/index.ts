/**
 * this is a hook for walletConnect and Disconnect
*/
import { useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import {message} from 'antd'
import {connections} from '@src/utils/web3React'
export const useAuth = () => {
    const { account, connector} = useWeb3React();

    const login:(connectorID:string) =>Promise<any> = useCallback(
      (connectorID: string) => {
        const targetInject = connections.find(item => item.type === connectorID)
        if (targetInject) {
          targetInject.connector.activate().then(() => {
            window.localStorage.setItem('connectorID', connectorID)
          }).catch(error => {
            console.log('Error', error.message)
            message.error(error.message)
            return Promise.reject()
          }) 
        }
        return Promise.resolve()
      },
      [connector],
    )

    const logout = useCallback(() => {
      connector.resetState()
      window.localStorage.removeItem('connectorID')
      // const connectorID = window.localStorage.getItem('connectorID')
      // const targetInject = connections.find(item => item.type === connectorID)
      // console.info('targetInject----------', targetInject, '55555', connector)
      // if (targetInject && targetInject.connector.deactivate) {
      //   targetInject.connector.deactivate()
      //   window.localStorage.removeItem('connectorIsD');
      // }
    }, [connector])

    useEffect(function mount(){
      let connectorID = localStorage.getItem('connectorID');
      if(connectorID) {
        window.localStorage.removeItem('connectorID');
        login(connectorID);
      }
    }, []);
    return { account, login, logout }
}
export default useAuth