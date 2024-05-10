const {google} = require('googleapis');

async function appendData() {
    const auth = new google.auth.GoogleAuth({
        keyFilename: '../fifth-humour-email-list.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({version: 'v4', auth: client});
    
    const spreadsheetId = '1NQ03kACJXrgxqH0RBZXymW-FgPVeIavCP3HkSSXQoKY';
    const range = 'Sheet1!A:A';

    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [['example@email.com']]
            },
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

appendData();
