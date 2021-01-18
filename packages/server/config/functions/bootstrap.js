'use strict'

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = () => {
  process.nextTick(() => {
    const io = require('socket.io')(strapi.server, {
      cors: {
        origin: ['http://localhost', 'http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
        transports: ['websocket', 'polling']
      }
    })

    io.on('connection', (socket) => {
      console.log('client connected:')
      io.sockets.sockets.forEach((socket) => console.log(socket.client.id))
      socket.on('afterConnected', (user) => {
        socket.join(`${user._id}`)
      })
    })

    strapi.io = io
  })
}
