# ponder
JavaScript tool that takes Magic: The Gathering Arena collection exports (CSV) and organizes them into a SQLite DB 

*TODO - more detailed docs*

TL;DR put `collection.csv` from tracker export in root dir, then run `npm run start` (after `npm install`) - after some time, `collection.db` will be generated in `db/`
Collection table shape is located in `db/get-or-create.js`