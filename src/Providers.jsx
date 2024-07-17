import { Web3ReactProvider } from '@web3-react/core'
// import { Provider } from 'react-redux'
// import localStore from './redux'
import { connectors } from '@src/utils/web3React'
export const Providers = ({ children }) => {
    return (
      <Web3ReactProvider connectors={ connectors }>
          {/* <Provider store={localStore}> */}
            {children}
          {/* </Provider> */}
      </Web3ReactProvider>
    )
  }
  
  export default Providers