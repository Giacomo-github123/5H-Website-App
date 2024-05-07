import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { google } from 'googleapis';
import cors from 'cors';

// Create an instance of Express application
const app = express();
app.use(cors());
// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// Google Sheets API setup
const auth = new google.auth.GoogleAuth({
    keyFilename: '../fifth-humour-email-list.json', // Path to your Google service account credentials file
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({version: 'v4', auth});

// Debugging: log server starting message
console.log("Server is initializing...");

// Test route to check basic functionality
app.get('/test', (req: Request, res: Response) => {
    res.status(200).send('Test route is working. Server is running and reachable.');
});

// POST endpoint to receive email from the frontend and append it to Google Sheets
app.post('/api/subscribe', async (req: Request, res: Response) => {
    const { email } = req.body as { email: string };
    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        const spreadsheetId = 'YOUR_SPREADSHEET_ID';
        const range = 'Sheet1!A:A';
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[email]]
            },
        });

        res.status(200).send('Email added successfully');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error when appending data to Google Sheets:', error);
            res.status(500).send(`Failed to add email: ${error.message}`);
        } else {
            console.error('Unexpected error:', error);
            res.status(500).send('Failed to add email due to an unexpected error.');
        }
    }
});


// Specify the port to listen on and add error handling for server start-up
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (error) => {
    console.error('Error starting server:', error);
});
