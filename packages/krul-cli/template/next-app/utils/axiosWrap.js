const axios = require('axios');
const apiHost = require('config/apiHost');
const ENV = process.env.NODE_ENV;

axios.defaults.headers = {
  Accept: "application/json",
  "Content-Type": "application/x-www-form-urlencoded",
  "X-Requested-With": "XMLHttpRequest"
};
axios.defaults.withCredentials = true;

module.exports = (req) => {
  if (!!req) {
    axios.defaults.headers = {
      cookie: req.headers.cookie
    };
  }

  // axios.interceptors.request.use(
  //   function(config) {

  //     // 打印请求
  //     if (process.env.NODE_ENV === 'development') {

  //     } else {

  //     }
  //     return config;
  //   },
  //   function(error) {
  //     return Promise.reject(error);
  //   }
  // // );
  // axios.interceptors.response.use(
  //   function(response) {
  //     if (process.env.NODE_ENV !== 'development') {

  //     }
  //     return response.data;
  //   },
  //   function(error) {
  //     if (/code -10000/.test(new Error(error))) {
  //       // 拦截401跳转到登录

  //       return null;
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  return axios;
};
