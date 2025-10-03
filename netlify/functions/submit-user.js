const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { username } = JSON.parse(event.body);
    const clickId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const sheetData = { clickId, username, status: 'pending' };

    await fetch(process.env.GOOGLE_SHEET_WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetData),
    });

    const redirectUrl = process.env.CPA_OFFER_URL + clickId;
    return { statusCode: 200, body: JSON.stringify({ success: true, redirectUrl }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
