const msw = require('msw/node');
const { handlers } = require('./handlers');

// This configures a request mocking server with the given request handlers.
const server = msw.setupServer(...handlers);

module.exports = server;
