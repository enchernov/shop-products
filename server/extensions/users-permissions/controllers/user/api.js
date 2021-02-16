// 'use strict';
//
// const _ = require('lodash');
// const { sanitizeEntity } = require('strapi-utils');
// const axios = require('axios')
// const sanitizeUser = user =>
//   sanitizeEntity(user, {
//     model: strapi.query('user', 'users-permissions').model,
//   });
//
// const formatError = error => [
//   { messages: [{ id: error.id, message: error.message, field: error.field }] },
// ];
//
// module.exports = {
//   async update(ctx) {
//     const advancedConfigs = await strapi
//       .store({
//         environment: '',
//         type: 'plugin',
//         name: 'users-permissions',
//         key: 'advanced',
//       })
//       .get();
//
//     const { id } = ctx.params;
//     const { email, username, password } = ctx.request.body;
//
//     const user = await strapi.plugins['users-permissions'].services.user.fetch({
//       id,
//     });
//
//     if (_.has(ctx.request.body, 'email') && !email) {
//       return ctx.badRequest('email.notNull');
//     }
//
//     if (_.has(ctx.request.body, 'username') && !username) {
//       return ctx.badRequest('username.notNull');
//     }
//
//     if (_.has(ctx.request.body, 'password') && !password && user.provider === 'local') {
//       return ctx.badRequest('password.notNull');
//     }
//
//     if (_.has(ctx.request.body, 'username')) {
//       const userWithSameUsername = await strapi
//         .query('user', 'users-permissions')
//         .findOne({ username });
//
//       if (userWithSameUsername && userWithSameUsername.id !== id) {
//         return ctx.badRequest(
//           null,
//           formatError({
//             id: 'Auth.form.error.username.taken',
//             message: 'username.alreadyTaken.',
//             field: ['username'],
//           })
//         );
//       }
//     }
//
//     let updateData = {
//       ...ctx.request.body,
//     };
//
//     if (_.has(ctx.request.body, 'email') && advancedConfigs.unique_email) {
//       const userWithSameEmail = await strapi
//         .query('user', 'users-permissions')
//         .findOne({ email: email.toLowerCase() });
//
//       if (userWithSameEmail && userWithSameEmail.id !== id) {
//         return ctx.badRequest(
//           null,
//           formatError({
//             id: 'Auth.form.error.email.taken',
//             message: 'Email already taken',
//             field: ['email'],
//           })
//         );
//       }
//       ctx.request.body.email = ctx.request.body.email.toLowerCase();
//       if (user?.email !== email) {
//         await axios.post(`http://localhost:1337/auth/send-email-confirmation`, {email, username})
//           .then(res => {
//             console.log('AXIOS RES', res)
//             updateData = {...updateData, confirmed: false}
//           }).catch(e => console.log(e))
//       }
//     }
//
//     if (_.has(ctx.request.body, 'password') && password === user.password) {
//       delete updateData.password;
//     }
//
//     console.log(updateData)
//
//     const data = await strapi.plugins['users-permissions'].services.user.edit({ id }, updateData);
//
//     ctx.send(sanitizeUser(data));
//   },
// };
