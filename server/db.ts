const Pool = require('pg').Pool;

var db = null

if (process.env.NODE_ENV === 'production') {
  db = new Pool({
      user: 'cwopzhgecnuozu',
      host: 'ec2-79-125-4-72.eu-west-1.compute.amazonaws.com',
      database: 'd37eu06rjqd573',
      password: '2a8604eab1f84793080726fd221764a225f0d5a16131760cf5a5362c24f4b766',
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
