const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const { AIRTABLE_API_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`
      }
    });

    const providers = response.data.records.map(r => {
      const fields = r.fields;
      return {
        Name: fields['Provider Name'],
        Services: fields['Service Types'] ? (Array.isArray(fields['Service Types']) ? fields['Service Types'].join(', ') : fields['Service Types']) : '',
        Phone: fields['Phone Number'],
        Email: fields['Email'],
        Address: fields['Address'],
        Rate: fields['Hourly Rate'],
        Area: fields['Coverage Areas'] ? (Array.isArray(fields['Coverage Areas']) ? fields['Coverage Areas'].join(', ') : fields['Coverage Areas']) : 'Gatineau'
      };
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(providers)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load providers' })
    };
  }
};
