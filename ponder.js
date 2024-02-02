import GetOrCreateDB from './db/get-or-create.js';
import ParseCollection from './utils/csv-parse.js';
import InsertIntoCollection from './db/insert.js';
import * as Scry from 'scryfall-api';

// TODO: Need to figure out how to handle dual-sided or other "funky" cards
// TODO lookup card and skip API call if exists
(async () => {
    // Get or Create the DB, store in variable
    const db = GetOrCreateDB();

    // Get collection from csv, then data from scryfall.
    // After data resolves, insert into DB.
    // All of that is inserted into a promise array 'inserts'
    // It's kinda ugly but eh, it works
    ParseCollection().then((GetCollection) => {
        const inserts = [];
        const collection = GetCollection();
        collection.forEach((row, i) => {
            const delay = 100 * i; // 100ms between requests per api docs
            inserts.push(new Promise(async (resolveRowProcess) => {
                await new Promise(wait => setTimeout(wait, delay));
                let lookup = await new Promise(apiCallResolve => {
                    console.log(`Collecting ${row.card} (${i+1}/${collection.length})`);
                    Scry.Cards.byName(row.card, true).then((info) => {
                        if(!info) {
                            console.log(`Could not get info from Scryfall for card: ${row.card}`);
                            return;
                        }
    
                        row.card_set_name = info.set_name ? info.set_name.replaceAll('\'', '\'\'') : '';
                        row.type = info.type_line;
                        row.cost = info.mana_cost;
                        row.c_text = info.oracle_text ? info.oracle_text.replaceAll('\'', '\'\'') : '';
                        row.power = info.power ? info.power : null;
                        row.toughness = info.toughness ? info.toughness : null;
                        row.img_url = info.image_uris ? info.image_uris.normal : '';
                        row.keywords = info.keywords ? info.keywords : [];
                        row.loyalty = info.loyalty;
                        row.cmc = info.cmc;
                        row.scryfall_uri = info.scryfall_uri.replaceAll('\'', '\'\'');
                        row.colors = info.colors ? info.colors : [];
                        row.rarity = info.rarity ? info.rarity.replaceAll('\'', '\'\'') : 'Unknown';

                        InsertIntoCollection(db, row);
                    });
                    apiCallResolve(delay); 
                });
                resolveRowProcess(lookup);
            })
            );
        });
    });
})();