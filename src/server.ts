import express, { Request, Response } from 'express';
import cors from 'cors';
import { google } from 'googleapis';


const app = express();
console.log("Server is initializing...");
app.use(cors());
app.use(express.json()); // Since bodyParser.json() is now deprecated

// Google Sheets API setup
const KEYFILEPATH = '../fifth-humour-email-list.json'; // Ensure this path is correct
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
    keyFilename: KEYFILEPATH,
    scopes: SCOPES
});
const sheets = google.sheets({ version: 'v4', auth });

// Endpoint to receive email and append it to Google Sheets
app.get('/api/subscribe', async (req: Request, res: Response) => {
    console.log('Received request to subscribe email:', req.query.email)
    const { email } = req.query as { email?: string };

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
    } catch (error: any) {
        console.error('Error when appending data to Google Sheets:', error);
        res.status(500).send(`Failed to add email: ${error.message}`);
    }
});

// Set the port to listen on
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
