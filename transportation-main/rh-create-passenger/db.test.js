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

  const memberTest = {
    circulo_member_id: 'cid-123-test',
    first_name: 'Test first',
    last_name: 'Test last',
    dob: '6/4/1964',
    status: 'inactive',
    phone_number: '(202) 555-0190',
    language_id: 'en',
    gender: 'female',
    service_provider: 'ride-health',
  };

  const passengerReturn = {
    code: '12032',
    created: 1625029418838,
    customer_key: 'cid-123-test',
    dob: 1587043737000,
    key: 'PAS1234567890',
    language: 'en',
    name: {
      first: 'Test first',
      last: 'Test last',
    },
    phone: '(202) 555-0190',
    status: 'active',
  };

  beforeAll(async () => {
    await db.put({ TableName: 'passenger', Item: passengerTest }).promise();
    await db.put({ TableName: 'passenger', Item: memberTest }).promise();
  });

  test('should return inactive passengers', async () => {
    const passengers = await dbHandler.getMembersByStatus('inactive');
    expect(passengers.Items).toEqual(
      expect.arrayContaining([expect.objectContaining({ status: 'inactive' })])
    );
  });

  test('should return active passengers', async () => {
    const passengers = await dbHandler.getMembersByStatus('active');
    expect(passengers.Items).toEqual(
      expect.arrayContaining([expect.objectContaining({ status: 'active' })])
    );
  });

  test('should update passenger to active', async () => {
    const originalItem = await db
      .get({ TableName: 'passenger', Key: { circulo_member_id: 'cid-123-test' } })
      .promise();

    await dbHandler.updateMember(passengerReturn);

    const updatedItem = await db
      .get({ TableName: 'passenger', Key: { circulo_member_id: 'cid-123-test' } })
      .promise();

    expect(originalItem.Item.status).toBe('inactive');
    expect(updatedItem.Item.status).toBe('active');
  });
});
