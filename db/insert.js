/**
 * Values: 
 *  - card,           text,         CSV, REQ
 *  - type,           text,         API, REQ
 *  - cost,           text,         API, REQ
 *  - c_text          text,         API, REQ
 *  - power,          text,         API
 *  - toughness,      text,         API
 *  - card_set_id,    text,         CSV, REQ
 *  - quantity        int,          CSV, REQ
 *  - img_url         text,         API, REQ
 *  - keywords        JSON[]<text>, API, REQ (but could be empty)
 *  - loyalty         text,         API
 *  - CMC             int,          API, REQ
 *  - scryfall_uri    text,         API, REQ
 */
export default (db, values) => {
    // nullable values, TODO can probably DRY up
    const power = values.power ? `'${values.power}'` : 'NULL';
    const toughness = values.toughness ? `'${values.toughness}'` : 'NULL';
    const img_url = values.img_url ? `'${values.img_url}'` : 'NULL';
    const loyalty = values.loyalty ? `'${values.loyalty}'` : 'NULL';
    const keywords = JSON.stringify(values.keywords);

    db.serialize(() => {
        db.run(`
            INSERT or IGNORE INTO collection(
                card,
                type,
                cost,
                c_text,
                power,
                toughness,
                card_set_id,
                card_set_name,
                quantity,
                img_url,
                keywords,
                loyalty,
                cmc,
                scryfall_uri
            )
            VALUES (
                '${values.card}',
                '${values.type}',
                '${values.cost}',
                '${values.c_text}',
                ${power},
                ${toughness},
                '${values.card_set_id}',
                '${values.card_set_name}',
                '${values.quantity}',
                ${img_url},
                json('${keywords}'),
                ${loyalty},
                ${values.cmc},
                '${values.scryfall_uri}'
            );
        `);
    });
};