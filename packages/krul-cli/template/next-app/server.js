const express = require('express');
const cp = require('child_process');
const path = require('path');
const next = require('next');
const proxyMiddleware = require('http-proxy-middleware');

const { publicRuntimeConfig, serverRuntimeConfig, devProxy } = require('./next.config');
const { isDev, isBeta } = publicRuntimeConfig;
const { PORT } = serverRuntimeConfig;

const app = next({ dir: '.', dev: isDev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    // deal /favicon.ico
    server.get('/favicon.ico', (req, res) =>
      res.sendFile(path.join(__dirname, 'static', 'favicon.ico'))
    );

    if (isDev && devProxy) {
      Object.keys(devProxy).forEach(function (context) {
        server.use(context, proxyMiddleware(devProxy[context]));
      });
    }

    server.all('*', (req, res) => {
      if (req.url === '/service-worker.js') {
        return app.serveStatic(req, res, path.join(__dirname, 'build', req.url));
      } else {
        return handle(req, res);
      }
    });

    server.listen(PORT, err => {
      if (err) throw err;
      const serverUrl = `http://localhost:${PORT}`;
      console.log(`> Ready on ${serverUrl}`);
      // 开发环境自动启动
      if (isDev) {
        switch (process.platform) {
        //mac系统使用 一下命令打开url在浏览器
        case 'darwin':
          cp.exec(`open ${serverUrl}`);
          break;
          //win系统使用 一下命令打开url在浏览器
        case 'win32':
          cp.exec(`start ${serverUrl}`);
          break;
          // 默认mac系统
        default:
          cp.exec(`open ${serverUrl}`);
        }
      }
    });
  });
