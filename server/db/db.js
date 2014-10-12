var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Checkmate'
});

dbConnection.connect();

module.exports.saveUser = function(user, callback) {
  executeQuery('INSERT INTO Users(Username, Password) VALUES(?, ?);', [user.username, user.password], callback);
};

module.exports.findUser = function(user, callback) {
  console.log(user.username)
  executeQuery('SELECT * FROM Users WHERE Username = ? LIMIT 1;', [user.username], callback);
};

module.exports.createGroup = function(group, callback) {

};

module.exports.updateGroup = function(group, callback) {

};

module.exports.findGroup = function(group, callback) {

};

var executeQuery = function(query, param, callback){
  if (!callback) {
    callback = param;
    dbConnection.query(query, function(err, results){
      callback(err, results);
    });
  } else {
    dbConnection.query(query, param, function(err, results){
      callback(err, results);
    });
  }
};