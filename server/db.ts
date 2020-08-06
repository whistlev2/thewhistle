const Pool = require('pg').Pool;

var db = null
if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'staging') {
    db = new Pool({
        user: process.env.DATABASE_USER,
        host:process.env.DATABASE_HOST,
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