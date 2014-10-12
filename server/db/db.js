var mysql = require('mysql');
var bcrypt = require('bcrypt');

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Checkmate'
});

dbConnection.connect();

module.exports.saveUser = function(user, callback) {
  executeQuery('INSERT INTO Users(username, password) VALUES(?, ?);', [user.username, user.password], callback);
};

module.exports.findUser = function(user, callback) {
  executeQuery('SELECT * FROM Users WHERE username = ? LIMIT 1;', [user.username], callback);
};

module.exports.createGroup = function(group, callback) {
  module.exports.findUser({ username: group.user }, function(err, user) {
    group.password = hashPassword(group.password);
    executeQuery('INSERT INTO Groups(name, password, userId) VALUES(?, ?, ?);', [group.name, group.password, user[0].userId], callback);
  });
};

module.exports.joinGroup = function(group, password, callback) {
  module.exports.findUser({ username: group.user }, function(err, user) {
    if(validatePassword(group.password, password)) {
      group.password = hashPassword(group.password);
      executeQuery('INSERT INTO Groups(name, password, userId) VALUES(?, ?, ?);', [group.name, group.password, user[0].userId], callback);
    }
    else { callback('Password incorrect.'); }
  });
};

module.exports.findGroup = function(group, callback) {
  executeQuery('SELECT * FROM Groups WHERE name = ? LIMIT 1;', [group.name], callback);
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

var validatePassword = function(password, storedPassword) {
  return bcrypt.compareSync(password, storedPassword); 
};

var hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};