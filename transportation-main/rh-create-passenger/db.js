// sconst AWS = require('aws-sdk');

// const db = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });
const batchNo = process.env.BATCH_RUN_NO;

class DbHandler {
  constructor(db) {
    this.db = db;
    this.passengers = [];
  }

  async getMembersByStatus(status) {
    const params = {
      TableName: 'passenger',
      IndexName: 'status-index',
      KeyConditionExpression: '#member_status = :status_val',
      ExpressionAttributeValues: { ':status_val': status },
      ExpressionAttributeNames: { '#member_status': 'status' },
      Limit: batchNo,
    };

    let data;

    try {
      data = await this.db.query(params).promise();
    } catch (error) {
      console.error(`error querying inactive members: ${error}`);
    }

    return data;
  }

  async updateMember(member) {
    const params = {
      TableName: 'passenger',
      Key: {
        circulo_member_id: member.customer_key,
      },
      UpdateExpression: 'SET #member_status = :status_val',
      ExpressionAttributeNames: {
        '#member_status': 'status',
      },
      ExpressionAttributeValues: {
        ':status_val': member.status,
      },
      ReturnValue: 'UPDATED_NEW',
    };

    let response;

    try {
      response = await this.db.update(params).promise();
    } catch (error) {
      console.error(`unable to update member: ${error}`);
    }

    return response;
  }
}

module.exports = DbHandler;
