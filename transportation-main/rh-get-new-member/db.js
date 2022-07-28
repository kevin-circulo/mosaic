const TableMember = process.env.DYNAMODB_MEMBER_NAME;
const TablePassenger = process.env.DYNAMODB_PASSENGER_NAME;
const UpdateIncrement = process.env.UPDATE_INCREMENT;

class DbHandler {
  constructor(db) {
    this.db = db;
    this.passengers = [];
  }

  async getCurrentPassengers() {
    const params = {
      TableName: TablePassenger || 'passenger',
      IndexName: 'service_provider-index',
      ProjectionExpression: 'circulo_member_id',
      KeyConditionExpression: '#provider = :provider_val',
      ExpressionAttributeValues: { ':provider_val': 'ride-health' },
      ExpressionAttributeNames: { '#provider': 'service_provider' },
    };

    let passengers;

    try {
      passengers = await this.db.query(params).promise();
    } catch (error) {
      console.error(`error querying passengers: ${error}`);
    }
    return passengers;
  }

  async resolveNewMembers(passengers) {
    const passengerIds = passengers.Items.map((p) => p.circulo_member_id);
    const expressionFilterValues = {};

    for (let i = 0; i < passengerIds.length; i += 1) {
      const pkey = `:passenger_id_val${i}`;
      expressionFilterValues[pkey.toString()] = passengerIds[i];
    }

    const paramsMemberScan = {
      TableName: TableMember,
      FilterExpression: `not memberId in (${Object.keys(expressionFilterValues).toString()})`,
      ExpressionAttributeValues: expressionFilterValues,
      Limit: UpdateIncrement,
    };

    let members;

    try {
      members = await this.db // TODO optimize it with a query instead of scan
        .scan(paramsMemberScan)
        .promise();
    } catch (error) {
      console.error(`error querying members: ${error}`);
    }

    return members;
  }
}

module.exports = DbHandler;
