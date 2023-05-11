const http = require('http');
const { updateGoogleSheetsAndSend } = require('./google-apis');

// Define the port number for the server
const PORT = 3000;

// Create a new HTTP server
const server = http.createServer(async (req, res) => {
    // Call the main function to run the app
    var updatedGoogleSheet = await updateGoogleSheetsAndSend();
    console.log(updatedGoogleSheet);
    // Send a response to the client
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Google Sheets file has been updated and sent!\n');
});

// Start the server listening on the specified port
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});