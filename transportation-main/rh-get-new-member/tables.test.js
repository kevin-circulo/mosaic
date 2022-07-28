const { DynamoDB } = require('aws-sdk');
const DbHandler = require('./db');

const db = new DynamoDB.DocumentClient({ region: 'us-east-2' });
const dbHandler = new DbHandler(db);

describe.skip('Passenger', () => {
  const passengerTest = {
    circulo_member_id: '323232323',
    first_name: 'Test first',
    last_name: 'Test last',
    dob: '6/4/1964',
    status: 'inactive',
    phone_number: '555-555-5555',
    language_id: 'en',
    gender: 'female',
    service_provider: 'ride-health',
  };

  beforeAll(async () => {
    await db.put({ TableName: 'passenger', Item: passengerTest }).promise();
  });

  test('should be passenger in table', async () => {
    const { Item } = await db
      .get({ TableName: 'passenger', Key: { circulo_member_id: '323232323' } })
      .promise();
    expect(Item).toEqual(passengerTest);
  });

  test('should get current passengers - getCurrentPassengers', async () => {
    const passengers = await dbHandler.getCurrentPassengers();
    expect(passengers.Items).toEqual(
      expect.arrayContaining([expect.objectContaining({ circulo_member_id: '323232323' })])
    );
  });
});
