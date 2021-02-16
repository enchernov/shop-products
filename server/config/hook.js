module.exports = ({env}) => ({
  timeout: 10000,
  settings: {
    algolia: {
      enabled: true,
      applicationId: env('ALGOLIA_APP_ID'),
      apiKey: env('ALGOLIA_API_SECRET'),
      debug: true,
      prefix: 'dev'
    },
  }
})
