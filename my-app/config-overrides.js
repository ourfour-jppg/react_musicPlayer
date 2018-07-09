const { injectBabelPlugin } = require('react-app-rewired');
// const postcss = require('react-app-rewire-postcss-modules');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
  // config = postcss(config, env)
  require('react-app-rewire-postcss')(config)
  // console.log(config)
  // config = loaderNameMatches(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
  return config;
};