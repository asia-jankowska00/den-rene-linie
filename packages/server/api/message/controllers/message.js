'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    let entity
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      entity = await strapi.services.message.create(data, { files })
    } else {
      entity = await strapi.services.message.create(ctx.request.body)
    }
    const sanitizedEntity = sanitizeEntity(entity, { model: strapi.models.message })

    strapi.io.to(`${ctx.request.body.receiver}`).emit('createdMessage', sanitizedEntity)

    return sanitizedEntity
  }
}
