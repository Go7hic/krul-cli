// 模板里面的黑白名单
const templateBlacklist = new Set([
  'example/public/favicon.ico',
  'static/favicon.ico'
]);

const templateTSBlacklist = new Set([
  'src/index.js'
]);

const templateTSWhitelist = new Set([
  'tsconfig.json',
  'src/index.tsx',
  'src/typings.d.ts',
  'example/tsconfig.json'
]);



module.exports = {
  templateBlacklist,
  templateTSBlacklist,
  templateTSWhitelist,
};
