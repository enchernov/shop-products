module.exports = {
  settings: {
    cors: {
      enabled: true,
      headers: ['*'],
      methods: ['*'],
      origin: ['*'],
      // origin: 'https://shop-products.vercel.app/',
    //   expose: ['WWW-Authenticate', 'Server-Authorization', 'Access-Control-Expose-Headers'],
    //   maxAge: 31536000,
    //   credentials: true,
    //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    //   headers: [
    //     'Content-Type',
    //     'Authorization',
    //     'X-Frame-Options',
    //     'Origin',
    //     'Access-Control-Allow-Headers',
    //     'access-control-allow-origin',
    //   ],
    },
  },
};
