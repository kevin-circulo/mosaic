const AWS = require('aws-sdk');

const region = 'us-east-2';
const secretName =
  'arn:aws:secretsmanager:us-east-2:395441376902:secret:rh-webhook-circulo-staging-Y5xmd6';
const db = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE;
const CryptoJS = require('crypto-js');

module.exports.handleEvent = async (event) => {
  let secret;
  const client = new AWS.SecretsManager({
    region,
  });

  await client
    .getSecretValue({ SecretId: secretName }, (err, data) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        secret = JSON.parse(data.SecretString)['rh-circulo-staging-secret'];
      }
    })
    .promise();

  const rideData = JSON.parse(event.body);
  const payload = rideData.event;

  const dig = CryptoJS.HmacSHA256(event.body, secret).toString(CryptoJS.enc.Base64);

  if (dig !== event.headers['x-ride-health-signature']) {
    console.log('Authorization failed');
    return {
      statusCode: 401,
      body: 'Unauthorized',
    };
  }

  const params = {
    TableName,
    Item: {
      event_id: rideData.event_id,
      event_source: 'RideHealth',
      event_timestamp: rideData.event_timestamp,
      event_type: rideData.event_type,
      event_payload: payload,
    },
  };

  if (params.Item.event_type === 'ride.change') {
    console.log(`Ride change insertion parameters: ${JSON.stringify(params)}`);
    try {
      await db.put(params).promise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return {
    statusCode: 200,
    body: 'Event accepted',
  };
};
