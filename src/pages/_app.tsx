import type { AppProps } from "next/app";
import localstore from '../redux';
import { Provider } from "react-redux";
import { Layout } from "antd";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import '../styles/globals.scss';
import { useResponsiveInit } from "@/hooks/useResponsive"
function Wrapper({ Component, pageProps }) {
  const { Content } = Layout;
  useResponsiveInit(); // add the responsive init
  return (
    <>
      <AppHeader />
      <Content>
        <Component {...pageProps} />
      </Content>
      <AppFooter />
    </>
  )
}
export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={localstore}>
          <Wrapper pageProps={pageProps} Component={Component} />
      </Provider>
  )
}