// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
// ./pages/_document.js
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import axiosWrap from 'utils/axiosWrap';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {

    // const userInfo = await axios.get('/user/info', {
    //   headers: {
    //     Cookie: ctx.req.headers.cookie
    //   }
    // });
    // console.log('userInfo111111', userInfo);


    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel='shortcut icon' href='/static/favicon.ico' type='image/ico'/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
