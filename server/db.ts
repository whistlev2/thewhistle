const Pool = require('pg').Pool;

if (process.env.NODE_ENV === 'production') {
  const db = new Pool(process.env.DATABASE_URL)
} else {
  const db = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'thewhistle',
      password: 'postgres',
      port: 5432
  });
}


module.exports = db;
