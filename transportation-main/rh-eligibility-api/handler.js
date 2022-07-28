const getMember = require('./getMember');

// eslint-disable-next-line consistent-return
module.exports.memberRideHealthEligibility = async (event) => {
  try {
    const data = await getMember(event.queryStringParameters.circulo_member_id);
    const member = data.Items.pop();

    if (!member) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'The requested id was not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: member.status }),
    };
  } catch (err) {
    console.error(`Error getting member ${event}. The error is ${err}`);
  }
};
