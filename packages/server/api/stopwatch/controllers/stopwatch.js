'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.stopwatch.search(ctx.query)
    } else {
      entities = await strapi.services.stopwatch.find(ctx.query,[
        'employee',
        'booking',
        { path: 'booking', populate: { path: 'service' } }
      ])
    }

    return entities.map((entity) => sanitizeEntity(entity, { model: strapi.models.stopwatch }))
  }
}
