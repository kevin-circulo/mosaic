const { DynamoDB } = require('aws-sdk');
const faker = require('faker');

const db = new DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE;

module.exports.run = async () => {
  const newPassenger = {
    circulo_member_id: faker.datatype.uuid(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    dob: '6/4/1964',
    status: 'inactive',
    phone_number: faker.phone.phoneNumber(),
    language_id: 'en',
    gender: 'female',
    service_provider: 'ride-health',
  };

  try {
    await db
      .put({
        TableName,
        Item: newPassenger,
      })
      .promise();
  } catch (error) {
    console.error(error);
  }
};
