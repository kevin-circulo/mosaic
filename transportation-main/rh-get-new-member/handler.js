const { DynamoDB } = require('aws-sdk');

const db = new DynamoDB.DocumentClient();

const DbHandler = require('./db');

const dbHandler = new DbHandler(db);

module.exports.run = async () => {
  const passengers = await dbHandler.getCurrentPassengers();
  const newMembers = await dbHandler.resolveNewMembers(passengers);
  console.log({ passengers });
  console.log(JSON.stringify(newMembers, null, 2));
};
