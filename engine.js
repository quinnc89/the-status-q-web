require('dotenv').config();
const { ApifyClient } = require('apify-client');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');

async function runStatusQEngine(keyword) {
    // 1. Setup Apify
    const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

    // 2. Setup Google Sheets
    const creds = JSON.parse(fs.readFileSync('./credentials.json'));
    const doc = new GoogleSpreadsheet('1mgT1B4149Ja5TOBpS5qM3D-3P0Zj6qFHIQvi1rvLIj4', new JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    }));

    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Sheet1'];

    console.log(`🚀 Searching Instagram for: ${keyword}`);

    // 1. Define your target list
    const keywords = ['entrepreneur', 'business', 'ecom']; 
    const totalSafetyLimit = 180; 
    const limitPerWord = Math.floor(totalSafetyLimit / keywords.length);

    // 2. Format the input for the scraper
    const input = {
        "search": keywords.join(','), 
        "searchType": "user",
        "resultsLimit": limitPerWord 
    };

    const run = await client.actor('apify/instagram-search-scraper').call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    // 4. Send to Google Sheets
    for (const item of items) {// Check for duplicates
        const rows = await sheet.getRows();
        const isDuplicate = rows.some(row => row.get('Handle') === item.username);

        if (isDuplicate) {
            console.log(`⏭️ Skipping duplicate: ${item.username}`);
            continue; 
        }
        await sheet.addRow({
            Handle: item.username,
            Followers: item.followersCount,
            Bio: item.biography,
            Website: item.externalUrl,
            "Status Q Gap": item.externalUrl?.includes('linktr.ee') ? 'Uses Linktree (High Gap)' : 'Custom Site'
        });
    }

    console.log('✅ Done! Check your Google Sheet.');
}

runStatusQEngine();