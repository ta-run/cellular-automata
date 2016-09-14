'use strict';
const hapi = require('hapi')
const inert = require('inert')
const server = new hapi.Server()

server.connection({
    port: process.env.port || '8888',
    host: '0.0.0.0'
})

server.register(inert, (err) => {
    if (err) throw err

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                listing: true
            }
        }
    })

    server.start((err) => {
        if (err) throw err;
        console.log(`Server running at ${server.info.uri}`)
    })
})