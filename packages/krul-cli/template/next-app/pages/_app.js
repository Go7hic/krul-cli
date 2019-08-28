import App, {Container} from 'next/app';
import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Head from 'next/head';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import './style.less';

export default class MyApp extends App {
  // static async getInitialProps ({ Component, router, ctx }) {
    // let pageProps = {};

    // if (Component.getInitialProps) {
    //   pageProps = await Component.getInitialProps(ctx);
    // }

    // return {pageProps};
  // }

  render () {
    const {Component, pageProps} = this.props;
    console.log(pageProps);
    return (
      <ConfigProvider locale={zhCN}>
        <Container>
          {
            pageProps.statusCode === 404 || pageProps.statusCode === 500
              ? (
                <Layout className="container-wrap">
                  <Layout className="container-no-sider">
                    <div className='page-right-area'>
                      <Component {...pageProps} />
                    </div>
                  </Layout>
                </Layout>
              )
              : (

                <Layout className="container-wrap">
                  <Header />
                  <Layout className="container-has-sider">
                    <LeftMenu />
                    <Layout>
                      <div className='page-right-area'>
                        <Component {...pageProps} />
                      </div>
                    </Layout>
                  </Layout>
                </Layout>
              )
          }

        </Container>
      </ConfigProvider>
    );
  }
}
