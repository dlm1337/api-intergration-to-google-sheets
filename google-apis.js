const { google } = require('googleapis');
//credentials would come from a google cloud project service account created.
//(add a key to your service account and it gives you the <credentials>.json)
const credentials = require('./google-credentials.json');

// Set up the Google Sheets API client with your Service Account credentials
const sheets = google.sheets({
    version: 'v4',
    auth: new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    }),
});

// Set up the Google Drive API client with your Service Account credentials
const drive = google.drive({
    version: 'v3',
    auth: new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/drive'],
    }),
});

// Define the ID of the Google Sheets file to be updated
const SPREADSHEET_ID = '1hEmBuGQPtKuWjRn9nvTgyQum0q_2Xh15oMld22ojzyE';

// Define the email address of the recipient for the updated Google Sheets file
const RECIPIENT_EMAIL = 'dlm1337.dm@gmail.com';

// Define the range of cells to be updated in the Google Sheets file
const RANGE = 'Sheet1!A1:C3';

// Export the function that updates the Google Sheets file and sends it to the recipient
async function updateGoogleSheetsAndSend() {
    try {
        // Retrieve the object from the external API
        // const response = await axios.get('<EXTERNAL_API_URL>');
        // const data = response.data;
        const jsonData = {
            data: [
                {
                    name: 'Alice',
                    age: 30,
                    gender: 'female',
                },
                {
                    name: 'Bob',
                    age: 25,
                    gender: 'male',
                },
                {
                    name: 'Charlie',
                    age: 40,
                    gender: 'male',
                },
            ],
        };

        const data = jsonData.data;
        // Update the Google Sheets file with the retrieved object
        const request = {
            valueInputOption: 'RAW',
            data: [
                {
                    range: RANGE,
                    values: [
                        [data[0].name, data[0].age, data[0].gender],
                        [data[1].name, data[1].age, data[1].gender],
                        [data[2].name, data[2].age, data[2].gender],
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