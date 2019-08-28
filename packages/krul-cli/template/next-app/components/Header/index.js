import React from 'react';
import Link from 'next/link';
import Router from 'next/router'
import './style.less';

export default function Header() {
  return (
    <header className="wxb-header wxb-header-default">


      <a className="wxb-logo" onClick={() => Router.push('/')}>
        <img src="//s.weituibao.com/static/1555047495591/logo_white.png" alt="" />
        <span>公众号一站式管理平台</span>
      </a>

      <Link href="/about">
        <a>
          关于
        </a>
      </Link>
      <Link href="/">
        <a>
          首页
        </a>
      </Link>
    </header>
  );
}
