'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  });

module.exports = {
  async find(ctx) {
    let users
    if (ctx.query._q) {
      users = await strapi.plugins['users-permissions'].services.user.search(ctx.query)
    } else {
      users = await strapi.plugins['users-permissions'].services.user.fetchAll(ctx.query, [
        'bookings',
        { path: 'bookings', populate: { path: 'service' } },
        'role'
      ])
    }

    ctx.body = users.map(sanitizeUser);
  }
}
