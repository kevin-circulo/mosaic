const { default: axios } = require('axios');

const passenger = {
  name: {
    first: 'member.first_name',
    last: 'member.last_name',
  },
  language: 'member.language_id',
  phone: '555-555-5555',
  dob: new Date('05-05-1995').valueOf(),
  customer_key: 'member.circulo_member_id',
  key: 'test_candidate',
  plan_id: 'PL112233',
  status: 'inactive'.toLowerCase(),
};

describe('RH Create Passenger Tests', () => {
  test('successful passenger created in RideHealth', async () => {
    const response = await axios.post(
      'https://circulo-staging.ridehealth.com/rest/v1/passenger',
      passenger
    );

    expect(response.status).toBe(200);
    expect(response.data.passengerStatus).toBe('active');
  });
});
