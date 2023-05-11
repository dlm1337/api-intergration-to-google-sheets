// Import the necessary packages
const { google } = require('googleapis');
const axios = require('axios');

// Set up the Google Sheets API client
const sheets = google.sheets({
    version: 'v4',
    auth: '<GOOGLE_SHEETS_API_KEY>',
});

// Set up the Google Drive API client
const drive = google.drive({
    version: 'v3',
    auth: '<GOOGLE_DRIVE_API_KEY>',
});

// Define the ID of the Google Sheets file to be updated
const SPREADSHEET_ID = '<GOOGLE_SHEETS_FILE_ID>';

// Define the email address of the recipient for the updated Google Sheets file
const RECIPIENT_EMAIL = '<RECIPIENT_EMAIL_ADDRESS>';

// Define the range of cells to be updated in the Google Sheets file
const RANGE = 'Sheet1!A1:C3';

// Export the function that updates the Google Sheets file and sends it to the recipient
async function updateGoogleSheetsAndSend() {
    try {
        // Retrieve the object from the external API
        const response = await axios.get('<EXTERNAL_API_URL>');
        const data = response.data;

        // Update the Google Sheets file with the retrieved object
        const request = {
            valueInputOption: 'RAW',
            data: [
                {
                    range: RANGE,
                    values: [
                        [data.field1, data.field2, data.field3],
                    ],
                },
            ],
        };
        await sheets.spreadsheets.values.batchUpdate({
            spreadsheetId: SPREADSHEET_ID,
            resource: request,
        });

        // Share the updated Google Sheets file with the recipient
        await drive.permissions.create({
            fileId: SPREADSHEET_ID,
            requestBody: {
                type: 'user',
                role: 'writer',
                emailAddress: RECIPIENT_EMAIL,
            },
            sendNotificationEmail: true,
        });

        console.log('Updated Google Sheets file has been sent to', RECIPIENT_EMAIL);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    updateGoogleSheetsAndSend,
};