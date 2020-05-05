const packageJson = require('../../package.json');

export const environment = {
  appName: 'Video Chat App',
  appShortName: 'VCA',
  envName: 'TEST',
  production: false,
  test: true,
  version: packageJson.version,
  base_url: "http://localhost:3000",
  api_url: 'http://localhost:3000/api'
};
