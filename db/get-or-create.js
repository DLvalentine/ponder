import sqlite3 from 'sqlite3';

// TODO -> just made collection table, will need to make DECKS table too
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
                set_id INTEGER NOT NULL,
                set_name TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                foil INTEGER NOT NULL,
                img_url TEXT,
                img BLOB
            )
        `);
    });

    return db;
};