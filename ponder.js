import GetOrCreateDB from './db/get-or-create.js';

(() => {
    // Get or Create the DB, store in variable
    const db = GetOrCreateDB();

    // Make sure to close! :)
    db.close();
})();