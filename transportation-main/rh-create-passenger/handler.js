const axios = require('axios');

const PassengerUrl = process.env.PASSENGER_ENDPOINT_PATH;
const rhUser = process.env.RH_USER;
const rhPass = process.env.RH_PASS;

const { DynamoDB } = require('aws-sdk');

const db = new DynamoDB.DocumentClient();
const DbHandler = require('./db');

const dbHandler = new DbHandler(db);

function mapMemberToPassenger(member) {
  const passenger = {
    name: {
      first: member.first_name,
      last: member.last_name,
    },
    language: member.language_id,
    phone: member.phone_number.toString(),
    dob: new Date(member.dob).valueOf(),
    customer_key: member.circulo_member_id,
    key: member.circulo_member_id,
    plan_id: 'PL112233',
    status: 'active'.toLowerCase(),
  };

  return passenger;
}

module.exports.createPassenger = async () => {
  const members = [];

  try {
    const data = await dbHandler.getMembersByStatus('inactive');

    data.Items?.forEach((item) => {
      // eslint-disable-line
      members.push(item);
    });
  } catch (err) {
    console.log(`error ${err}`);
  }

  const passengers = [];

  members.forEach((member) => {
    passengers.push(mapMemberToPassenger(member));
  });

  const credentials = `${rhUser}:${rhPass}`;
  const buf = Buffer.from(credentials, 'utf-8');
  const encodedCredentials = buf.toString('base64');

  await Promise.all(
    passengers.map(async (passenger) => {
      const res = await axios.post(PassengerUrl, JSON.stringify(passenger), {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'content-type': 'application/json',
        },
      });

      if (res.status === 200 && res.data.status === 'active') {
        try {
          await dbHandler.updateMember(res.data);
        } catch (err) {
          console.log(`an error occurred trying to update member ${err.message}`);
        }
      }
    })
  );
};
