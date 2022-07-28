const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE;

module.exports = (circuloMemberId) => {
  const params = {
    TableName,
    KeyConditionExpression: '#member_id = :member_id_val',
    ExpressionAttributeValues: { ':member_id_val': circuloMemberId },
    ExpressionAttributeNames: { '#member_id': 'circulo_member_id' },
  };

  let member;

  try {
    member = db.query(params).promise();
  } catch (error) {
    console.error(`Error querying for member ${error}`);
  }

  return member;
};
