import CsvReadableStream from 'csv-reader';
import * as fs from 'fs';

export default () => {
    let raw = fs.createReadStream('./collection.csv', 'utf-8');
    return new Promise((resolve) => {
        const collection = [];
        raw.pipe(new CsvReadableStream()).on('data', (row) => {
            // Card, Set ID, Set Name[skip], Quantity, Foil[skip]
            collection.push({
                card: row[0].replaceAll('\'', '\'\''),
                card_set_id: row[1],
                quantity: row[3]
            });
        }).on('end', () => {
            resolve(() => {
                return collection;
            });
        });
    });
}