import GetOrCreateDB from './db/get-or-create.js';
import ParseCollection from './utils/csv-parse.js';
import InsertIntoCollection from './db/insert.js';
import * as Scry from 'scryfall-api';  

(async () => {
    // Get or Create the DB, store in variable
    const db = GetOrCreateDB();

    // Get collection from csv, then data from scryfall.
    // After data resolves, insert into DB.
    // All of that is inserted into a promise array 'inserts'
    ParseCollection().then((GetCollection) => {
        const inserts = [];
        const collection = GetCollection();
        collection.forEach((row) => {
            inserts.push(
                Scry.Cards.byName(row.card).then((info) => {
                    row.card_set_name = info.set_name;
                    row.type = info.type_line;
                    row.cost = info.mana_cost;
                    row.c_text = info.oracle_text.replace('\'', '\'\'');
                    row.power = info.power ? info.power : null;
                    row.toughness = info.toughness ? info.toughness : null;
                    row.img_url = info.image_uris.normal;
                    row.keywords = info.keywords;
                    row.loyalty = info.loyalty;
                    row.cmc = info.cmc;
                    row.scryfall_uri = info.scryfall_uri;
                    InsertIntoCollection(db, row);
                })
            );
        });

        // Once all fetches and inserts are done, then we can close the db
        Promise.all(inserts).then(() => {
            db.close();
        });
    });
})();