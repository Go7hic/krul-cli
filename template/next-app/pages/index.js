import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios';
import { Button } from 'antd';
import Nav from '../components/Nav'
import './style.less';

const Home = ({ stars2 }) => {
  const [stars, setStars] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://api.github.com/repos/zeit/next.js');
      setStars(res.data.stargazers_count)
    }
    fetchData();

  }, [])
  return (
    <div>
    <Head>
      <title>Home</title>
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>Welcome to Next.js@wxb!</h1>
      <p className='description'>
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>
      <p className='description'>Next.js has {stars} ⭐️（我是客户端渲染的）</p>
      <p className='description'>Next.js has {stars2} ⭐️（我是服务端渲染的）</p>
      <div className='row'>
       <Button type="primary">wxb 🐂🍺</Button>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
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
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
  )
}

Home.getInitialProps = async ({ req }) => {
  const res = await axios.get('https://api.github.com/repos/zeit/next.js')
  return { stars2: res.data.stargazers_count }
}
export default Home
