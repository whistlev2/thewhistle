const Pool = require('pg').Pool;

var db = null

if (process.env.NODE_ENV === 'production') {
    db = new Pool({
        user: process.env.DATABASE_URL,
        host: process.env.DATABASE_URL,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: 5432,
        ssl: true
    });
} else {
    db = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'thewhistle',
        password: 'postgres',
        port: 5432
    });
}


module.exports = db;