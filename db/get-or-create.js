import sqlite3 from 'sqlite3';

export default () => {
    const db = new sqlite3.Database('./db/collection.db');

    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS collection(
                card TEXT NOT NULL PRIMARY KEY,
                type TEXT NOT NULL,
                cost TEXT NOT NULL,
                c_text TEXT NOT NULL,
                power TEXT,
                toughness TEXT,
                card_set_id TEXT NOT NULL,
                card_set_name TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                img_url TEXT,
                keywords JSON NOT NULL,
                loyalty TEXT,
                cmc INT NOT NULL,
                scryfall_uri TEXT NOT NULL,
                colors JSON NOT NULL,
                rarity TEXT NOT NULL
            )
        `);
    });

    return db;
};