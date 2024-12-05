const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    allowedHosts: 'all',
    client: {
      webSocketURL: {
        protocol: 'wss',
        hostname: process.env.CODESPACE_NAME + '-8080.app.github.dev',
        port: 443,
        pathname: '/ws'
      }
    },
  }
})
