const Pool = require('pg').Pool;

var db = null

if (process.env.NODE_ENV === 'production') {
  db = new Pool(process.env.DATABASE_URL)
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
