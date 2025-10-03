const fetch = require('node-fetch');

exports.handler = async (event) => {
  // --- Start of new logging ---
  console.log("--- SUBMIT-USER FUNCTION STARTED ---");
  // --- End of new logging ---

  try {
    const { username } = JSON.parse(event.body);
    const clickId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // --- Start of new logging ---
    console.log("Received Username:", username);
    console.log("Generated Click ID:", clickId);
    console.log("Google Sheet URL from ENV:", process.env.GOOGLE_SHEET_WEB_APP_URL);
    console.log("CPA Offer URL from ENV:", process.env.CPA_OFFER_URL);
    // --- End of new logging ---

    const sheetData = {
      clickId: clickId,
      username: username,
      status: 'pending'
    };

    // Send data to Google Sheet
    await fetch(process.env.GOOGLE_SHEET_WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetData),
    });

    // Create the redirect URL for the CPA locker
    const redirectUrl = process.env.CPA_OFFER_URL + clickId;

    // --- Start of new logging ---
    console.log("Final Redirect URL being sent to user:", redirectUrl);
    console.log("--- FUNCTION FINISHED SUCCESSFULLY ---");
    // --- End of new logging ---
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, redirectUrl: redirectUrl }),
    };
  } catch (error) {
    // --- Start of new logging ---
    console.error("--- FUNCTION FAILED WITH AN ERROR ---");
    console.error(error);
    // --- End of new logging ---
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
