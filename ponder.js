import GetOrCreateDB from './db/get-or-create.js';

(() => {
    // Get or Create the DB, store in variable
    const db = GetOrCreateDB();

    // TODO : use csv-parse to read and iterate over collection, gather data, and insert into db

    // Make sure to close! :)
    db.close();
})();