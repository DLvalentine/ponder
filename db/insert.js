import sqlite3 from 'sqlite3';

/**
 * Values: 
 *  - card,      text, CSV,  REQ
 *  - type,      text, API,  REQ
 *  - cost,      text, API,  REQ
 *  - c_text     text, API,  REQ
 *  - power,     text, API
 *  - toughness, text, API
 *  - set_id,    int,  CSV,  REQ
 *  - set_name,  text, CSV,  REQ
 *  - quantity   int,  CSV,  REQ
 *  - foil       int,  CSV,  REQ
 *  - img_url    text, API,  REQ
 *  - img        blob, FILE, REQ
 */
const InsertIntoCollection = (db, values) => {
    // nullable values, TODO DRY up
    const power = values.power ? `'${values.power}'` : 'NULL';
    const toughness = values.toughness ? `'${values.toughness}'` : 'NULL';
    const img_url = values.img_url ? `'${values.img_url}'` : 'NULL';
    const img = values.img ? `'${values.img}'` : 'NULL';

    db.serialize(() => {
        db.run(`
            INSERT INTO collection(
                card,
                type,
                cost,
                c_text,
                power,
                toughness,
                card_set_id,
                quantity,
                img_url,
                img
            )
            VALUES (
                '${values.card}',
                '${values.type}',
                '${values.cost}',
                '${values.c_text}',
                ${power},
                ${toughness},
                ${values.card_set_id},
                ${values.quantity},
                ${img_url},
                ${img}
            );
        `);
    });
};

/**
 * Values: 
 *  - card_set_id,   text, CSV, REQ
 *  - card_set_name, text, API, REQ
 */
const InsertIntoCardSet = (db, values) => {
    db.serialize(() => {
        db.run(`
            INSERT INTO card_set(
                card_set_id,
                card_set_name
            )
            VALUES (
                '${values.card_set_id}',
                '${values.card_set_name}
            )
        `);
    });
}

export {
    InsertIntoCollection,
    InsertIntoCardSet
};