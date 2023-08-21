const http = require('http');
const { updateGoogleSheetsAndSend } = require('./google-apis');

// Define the port number for the server
const PORT = 3000;

// Create a new HTTP server
const server = http.createServer(async (req, res) => {
    try {
        // Call the main function to run the app
        const updatedGoogleSheet = await updateGoogleSheetsAndSend();

        // Log the updated Google Sheet to the console
        console.log(updatedGoogleSheet);
        // Send a response to the client
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Google Sheets file has been updated and sent!\n');
    } catch (error) {
        console.error('An error occurred while updating and sending the Google Sheets file:', error);

        // Send a response to the client
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('An error occurred while updating and sending the Google Sheets file.\n');
    }
});
console.log('server created.')
// Start the server listening on the specified port
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});