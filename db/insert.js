import sqlite3 from 'sqlite3';

/**
 * Required values: 
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
// TODO will need to make additional function(s) for each table. For now this assumes that you're just inserting into collection table
export default (db, values) => {
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
                set_id,
                set_name,
                quantity,
                foil,
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
                ${values.set_id},
                '${values.set_name}',
                ${values.quantity},
                ${values.foil},
                ${img_url},
                ${img}
            );
        `);
    });
};