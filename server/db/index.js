var mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : ''
});

module.exports.connection.query('USE chat');

// module.exports.con = connection;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


