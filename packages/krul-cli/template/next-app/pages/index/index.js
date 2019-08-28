import React, { useEffect, useState, Fragment } from 'react';
import axiosWrap from 'utils/axiosWrap';
import * as service from 'service';
import { Button } from 'antd';
import superagent from 'superagent';
import Link from 'next/link';
import Head from 'next/head';
import PageContentWrap from 'components/PageContentWrap';


export default function Index(props) {
  const [userInfo, setUserInfo] = useState(props.userInfo);
  const [data, setData] = useState([]);
  useEffect(() => {

    async function getFavArticle() {
      const data = await service.getFavArticle();
      console.log(data);
      setData(data.data.data);
    }
    getFavArticle();

  }, []);
  return (
    <Fragment>
      <Head>
        <title>next-app-demo</title>
      </Head>
      <PageContentWrap className="home-page">
        <h1 className='title'>Welcome to Next.js</h1>
        <p className='description'>
        To get started, edit <code>pages/index.js</code> and save to reload.
        </p>

        <div className='row'>
          <Button type="primary">w🐂🍺</Button>
        </div>

        <div className='description'>
          {
            data && data.map(i => (
              <li key={i.account}>{i.account}</li>
            ))
          }
        </div>

        <style jsx>{`

        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }

      `}</style>
      </PageContentWrap>
    </Fragment>
  );
}

Index.getInitialProps = async ({ ctx, req }) => {
  const data = await axiosWrap(req).get('/user/Info');
  console.log(data);
  return { userInfo: data.data };
};
