const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const clickId = event.queryStringParameters.clickid;
    if (clickId) {
      const updateUrl = `${process.env.GOOGLE_SHEET_WEB_APP_URL}?clickId=${clickId}&status=completed`;
      await fetch(updateUrl);
    }
    return { statusCode: 200, body: 'Postback received.' };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
