import express, { Request, Response } from 'express';
import { google } from 'googleapis';

import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
  }));
app.use(express.json());

const PORT2 = process.env.PORT || 5144;

// Configure CORS if needed, here's a basic setup for local development:


// Set up Google Sheets API
const auth = new google.auth.GoogleAuth({
  keyFile: '../fifth-humour-email-list.json', // Path to your JSON key file
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Endpoint to receive POST requests to subscribe emails
app.post('/api/subscribe', async (req: Request, res: Response) => {
    const { email } = req.body;
    const spreadsheetId = '1NQ03kACJXrgxqH0RBZXymW-FgPVeIavCP3HkSSXQoKY'; // Replace with your spreadsheet ID
    const range = 'Sheet1!A:A'; // For example, appending to column A

    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: [[email]],
            },
        });
        res.status(200).send('Email added successfully');
    } catch (error) {
        console.error('Error updating spreadsheet:', error);
        res.status(500).send('Failed to update spreadsheet');
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT2}`);
});
