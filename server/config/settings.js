var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 3010,
  database   : {
    protocol : "mysql",
    host     : "127.0.0.1",
    user     : "root",
    query    : { pool: true },
    password : "root",
    database : "kriptografi",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
  }
};

module.exports = settings;
