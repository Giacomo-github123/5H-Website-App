// import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// //mport { google } from 'googleapis';
// import cors from 'cors';


// // Create an instance of Express application
// const app = express();

// // Middleware setup
// app.use(cors()); // Handle CORS requests
// app.use(bodyParser.json()); // Parse JSON bodies

// // Google Sheets API setup
// app.get('/test', (req, res) => {
//     console.log("Test route hit");
//     res.send('Test endpoint is working');
// });
// const { google } = require('googleapis');

// // Assuming you have the path to your service account key in a variable
// const KEYFILEPATH = '../fifth-humour-email-list.json'; // Adjust the path as necessary
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// const auth = new google.auth.GoogleAuth({
//     keyFilename: KEYFILEPATH, // Path to your JSON key file
//     scopes: SCOPES
// });
// const sheets = google.sheets({ version: 'v4', auth });

// // Log server initialization
// console.log("Server is initializing...");

// // Test route to verify basic server functionality
// app.get('/test', (req: Request, res: Response) => {
//     res.status(200).send('Test route is working. Server is running and reachable.');
//     console.log("Server is running and reachable.");
// });

// // POST endpoint to receive email from the frontend and append it to Google Sheets
// app.post('/api/subscribe', async (req: Request, res: Response) => {
//     const { email } = req.body as { email: string };

//     if (!email) {
//         console.log('Email address is missing in the request.');
//         return res.status(400).send('Email is required');
//     }

//     try {
//         const spreadsheetId = '1NQ03kACJXrgxqH0RBZXymW-FgPVeIavCP3HkSSXQoKY'; // Ensure this ID is correct
//         const range = 'Sheet1!A:A'; // Confirm this range is correct and the sheet exists
//         const response = await sheets.spreadsheets.values.append({
//             spreadsheetId,
//             range,
//             valueInputOption: 'USER_ENTERED',
//             requestBody: {
//                 values: [[email]]
//             },
//         });

//         console.log('Email added successfully:', response.data);
//         res.status(200).send('Email added successfully');
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.error('Error when appending data to Google Sheets:', error);
//             res.status(500).send(`Failed to add email: ${error.message}`);
//         } else {
//             console.error('Unexpected error:', error);
//             res.status(500).send('Failed to add email due to an unexpected error.');
//         }
//     }
// });

// // Set the port to listen on
// const PORT = process.env.PORT || 5173;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// }).on('error', (error) => {
//     console.error('Error starting server:', error);
// });
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { google } from 'googleapis';

// Create an instance of Express application
const app = express();

// Middleware setup
app.use(cors()); // Handle CORS requests
app.use(bodyParser.json()); // Parse JSON bodies

// Google Sheets API setup
const KEYFILEPATH = '../fifth-humour-email-list.json'; // Adjust the path as necessary
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
    keyFilename: KEYFILEPATH, // Path to your JSON key file
    scopes: SCOPES
});
const sheets = google.sheets({ version: 'v4', auth });

// Log server initialization
console.log("Server is initializing...");

// Test route to verify basic server functionality
// GET endpoint to receive email from the frontend and append it to Google Sheets
app.get('/test', (req, res) => {
    console.log("Test route accessed");
    res.send('Test endpoint is working');
});

// app.get('/api/subscribe', async (req, res) => {
//     const { email } = req.query as { email: string };

//     if (!email) {
//         console.log('Email address is missing in the request.');
//         return res.status(400).send('Email is required');
//     }

//     try {
//         const sheets = await; //what foes here?;
//         const spreadsheetId = '1NQ03kACJXrgxqH0RBZXymW-FgPVeIavCP3HkSSXQoKY';
//         const range = 'Sheet1!A:A';
//         const response = await sheets.spreadsheets.values.append({
//             spreadsheetId,
//             range,
//             valueInputOption: 'USER_ENTERED',
//             requestBody: {
//                 values: [[email]]
//             },
//         });

//         console.log('Email added successfully:', response.data);
//         res.status(200).send('Subscription successful');
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Failed to process your request due to an internal error.');
//     }
// });

app.get('/api/subscribe', async (req, res) => {
    const { email } = req.query as { email: string };

    if (!email) {
        console.log('Email address is missing in the request.');
        return res.status(400).send('Email is required');
    }

    try {
        const spreadsheetId = '1NQ03kACJXrgxqH0RBZXymW-FgPVeIavCP3HkSSXQoKY';
        const range = 'Sheet1!A:A';
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[email]]
            },
        });

        console.log('Email added successfully:', response.data);
        res.status(200).send('Subscription successful');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to process your request due to an internal error.');
    }
});



// Set the port to listen on
const PORT = process.env.PORT || 5173;