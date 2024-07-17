import type { AppProps } from "next/app";
import Providers from '../Providers'
import { Provider } from 'react-redux'
import localStore from '@src/redux'
import { Layout } from "antd";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import '../styles/globals.scss';
import { useResponsiveInit } from "@/hooks/useResponsive"
import { useListenToWallet } from '@src/hooks/useWallet'
function Wrapper({ Component, pageProps }) {
  const { Content } = Layout;
  useResponsiveInit(); // add the responsive init
  useListenToWallet();
  return (
    <div style={{height: '100vh', overflow: 'hidden', position: 'relative'}}>
      <AppHeader />
      <Content>
        <Component {...pageProps} />
      </Content>
      <AppFooter />
    </div>
  )
}
export default function App({ Component, pageProps }: AppProps) {
  return (
      <Providers>
        <Provider store={localStore}>
          <Wrapper pageProps={pageProps} Component={Component} />
        </Provider>
      </Providers>
  )
}