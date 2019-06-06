module.exports = {
  server: {
    command: './node_modules/.bin/ts-node ./fuse',
    // jest-puppeteer waits until this port respond before starting the tests
    port: 4444,
    // if the port is used, stop everything
    usedPortAction: 'error',
    // wait 60 secs max before timing out
    launchTimeout: 60000,
  },
}
