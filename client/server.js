const next = require('next')
const express = require('express')
const { join } = require('path')
const { parse } = require('url')

const PORT = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.use('/', express.static(join(__dirname, 'public/')))

    server.get('*', (req, res) => handle(req, res, parse(req.url, true)))

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`Server ready on http://localhost:${PORT}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
