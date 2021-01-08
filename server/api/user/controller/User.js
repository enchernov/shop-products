const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

// const Filter = require("bad-words");
// const filter = new Filter();

module.exports = {
  async update(ctx) {
    let entity;
    console.log(ctx);
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.create(data, { files });
    } else {
      entity = await strapi.services.comment.create(ctx.request.body);
    }

    entity = sanitizeEntity(entity, { model: strapi.models.comment });
    console.log(entity);
    //
    // // check if the comment content contains a bad word
    // if (entity.content !== filter.clean(entity.content)) {
    //   // send an email by using the email plugin
    // await strapi.plugins["email"].services.email.send({
    //   to: "paulbocuse@strapi.io",
    //   from: "admin@strapi.io",
    //   subject: "Comment posted that contains a bad words",
    //   text: `
    //       The comment #${entity.id} contain a bad words.
    //
    //       Comment:
    //       ${entity.content}
    //     `,
    // });
    // }

    return entity;
  },
};
