'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.plugins['users-permissions'].services.user.search(ctx.query)
    } else {
      entities = await strapi.plugins['users-permissions'].services.user.fetchAll(ctx.query, [
        'bookings',
        { path: 'bookings', populate: { path: 'service' } }
      ])
    }

    return entities
  }
}
