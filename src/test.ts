import { google, sheets_v4 } from 'googleapis';

// Configuration for Google Auth
const KEYFILEPATH: string = './fifth-humour-email-list.json'; // Path to your service account key file
const SCOPES: string[] = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({
    keyFilename: KEYFILEPATH,
    scopes: SCOPES,
});

async function testAppend(): Promise<void> {
    const sheets: sheets_v4.Sheets = google.sheets({ version: 'v4', auth });

    try {
        const spreadsheetId: string = '1NQ03kACJXrgxqH0RBZXymW-FgPVeIavCP3HkSSXQoKY'; // Your Google Sheet ID
        const range: string = 'Sheet1!A:A'; // The range in A1 notation
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [['test@example.com']] // Data to append
            },
        });
        console.log('Append successful:', response.data);
    } catch (error: any) {
        console.error('Failed to append:', error);
    }
}

testAppend();
