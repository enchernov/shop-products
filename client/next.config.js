/* eslint-disable
    @typescript-eslint/no-var-requires,
    @typescript-eslint/explicit-function-return-type
*/

require('dotenv').config()
const withOffline = require('next-offline')

const nextConfig = {
  webpack: (config) => {
    config.node = {
      fs: 'empty',
    }
    return config
  },
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL,
    NEXT_PUBLIC_CAPTCHA_SECRET_KEY: process.env.NEXT_PUBLIC_CAPTCHA_SECRET_KEY,
  },
  webpackDevMiddleware: (config) => {
    return config
  },
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? 'service-worker.js'
      : 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js',
      },
    ]
  },
}

module.exports = withOffline(nextConfig)
