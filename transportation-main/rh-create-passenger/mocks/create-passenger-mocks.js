const msw = require('msw');

const createPassengerHandlers = [
  msw.rest.post('https://circulo-staging.ridehealth.com/rest/v1/passenger', (req, res, ctx) => {
    return res(
      ctx.json({
        status: 'success',
        passengerStatus: 'active',
      })
    );
  }),
];

module.exports = { createPassengerHandlers };
