import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Router from 'next/router';

class ErrorPage extends Component {
  static propTypes = {
    statusCode: PropTypes.number
  }
  static defaultProps = {
    statusCode: 200
  }
  render() {
    let RenderComp;
    switch (this.props.statusCode) {
    case 200:
    case 404: {
      RenderComp = () => (
        <div className='content-container'>
          <style jsx>{`
              .content-container {
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
              .error-image {
                width: 200px;
                height: 200px;
                margin: 10px 0;
              }
            `}</style>

          <h3>The page is not found | 404～</h3>
          <Button onClick={() => Router.push('/')} type='primary' ghost>返回首页</Button>
        </div>
      );
      break;
    }
    case 500: {
      RenderComp = () => (
        <div className='content-container'>
          <style jsx>{`
              .content-container {
                position: absolute;
                top: 0;
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
              .error-image {
                width: 200px;
                height: 200px;
                margin: 10px 0;
              }
            `}</style>

          <h3>The page is error | 500～</h3>
          <Button onClick={() => Router.push('/')} type='primary' ghost>返回首页</Button>
        </div>
      );
      break;
    }
    default:
      break;
    }
    return (
      <RenderComp />
    );
  }
}

export default ErrorPage;
