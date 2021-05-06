module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://peaceful-mesa-39323.herokuapp.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'b5cee27aeb86c7ac02d89df115505228'),
    },
  },
});
