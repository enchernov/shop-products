// 'use strict';
//
// /**
//  * Auth.js controller
//  *
//  * @description: A set of functions called "actions" for managing `Auth`.
//  */
//
// /* eslint-disable no-useless-escape */
// const _ = require('lodash');
//
// const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//
//
// module.exports = {
//   async sendEmailConfirmation(ctx) {
//     const params = _.assign(ctx.request.body);
//
//     if (!params.email) {
//       return ctx.badRequest('missing.email');
//     }
//
//     const isEmail = emailRegExp.test(params.email);
//
//     if (isEmail) {
//       params.email = params.email.toLowerCase();
//     } else {
//       return ctx.badRequest('wrong.email');
//     }
//
//     const user = await strapi.query('user', 'users-permissions').findOne({
//       username: params.username,
//     });
//
//     if (user.confirmed) {
//       return ctx.badRequest('already.confirmed');
//     }
//
//     if (user.blocked) {
//       return ctx.badRequest('blocked.user');
//     }
//
//     try {
//       await strapi.plugins['users-permissions'].services.user.sendConfirmationEmail(user);
//       ctx.send({
//         email: user.email,
//         sent: true,
//       });
//     } catch (err) {
//       return ctx.badRequest(null, err);
//     }
//   },
// };
