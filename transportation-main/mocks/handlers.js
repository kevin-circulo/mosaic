const { createPassengerHandlers } = require('../rh-create-passenger/mocks/create-passenger-mocks');

const handlers = [
  ...createPassengerHandlers,

  // Add another endpoint here...
];

module.exports = { handlers };
