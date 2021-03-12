'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")("sk_test_51IP3byC5oJQ1RKxsOWAeCWPZwSjL0mwqjo4jz9L0q9umuD13vhUl9F6kpYA5rq5NPbV0cyzUjU8qpYMGFwhPgBmN00oRIpasv3");

module.exports = {
  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const { address, total, products, token } = ctx.request.body;
    const stripeAmount = Math.floor(total * 100);
    // charge on stripe
    console.log(strapi.services.orders, 1)
    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: stripeAmount,
      currency: "rub",
      description: `Order ${new Date()} by ${ctx.state.user._id}`,
      source: token,
    });
    // Register the order in the database
    const order = await strapi.services.orders.create({
      user: ctx.state.user.id,
      charge_id: charge.id,
      total: stripeAmount,
      address,
      products,
    });
    const checkedProducts = JSON.parse(products)
    console.log(checkedProducts)
    checkedProducts.map(async (x) => {
      const currentProductState = await strapi.query('product').findOne({id: x.id})
      console.log(x, currentProductState)
      // const validData = strapi.entityValidator.validateEntityUpdate(
      //   strapi.models.product,
      //   {
      //     ...currentProductState,
      //     available: currentProductState.available - x.count
      //   },
      // );
      await strapi.query('product').update({id: x.id}, {
        ...currentProductState,
        available: currentProductState.available - x.count
      })
    })

    ctx.body = order
    return order
  },
};
