const packageJson = require('../../package.json');

export const environment = {
  appName: 'Video Chat App',
  appShortName: 'VCA',
  envName: 'PROD',
  production: true,
  test: false,
  version: packageJson.version,
  base_url: '/'
};
