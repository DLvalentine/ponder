import CsvReadableStream from 'csv-reader';
import * as fs from 'fs';
import * as Scry from 'scryfall-api';
import * as InsertMethods from '../db/insert.js';

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const collection = [];
let raw = fs.createReadStream('../collection.csv', 'utf-8');
raw.pipe(new CsvReadableStream()).on('data', async (row) => {
    // Card, Set ID, Set Name[skip], Quantity, Foil[skip]
    collection.push({
        card: row[0],
        card_set_id: row[1],
        quantity: row[3]
    });
}).on('end', () => {
    collection.forEach(async (row) => {
        await delay(100); // 100ms delay per Scryfall rate limit

        // TODO -> lookup by name, then update records
        //Scry.Cards.byName(row.card).then((res) => console.log(res));
    });
    // TODO - either return collection or do inserts (if do inserts, then maybe restructure code a bit)
})
