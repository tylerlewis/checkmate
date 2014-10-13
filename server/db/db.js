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
  executeQuery('SELECT * FROM Users WHERE username = ?;', [user.username], callback);
};

module.exports.createGroup = function(group, callback) {
  group.password = hashPassword(group.password);
  executeQuery('INSERT INTO Groups(name, password) VALUES(?, ?);', [group.name, group.password], callback);
};

module.exports.joinGroup = function(group, password, callback) {
  if(validatePassword(group.password, password)) {
    callback();
  } else {
    callback('Password incorrect.');
  }
};

module.exports.findGroup = function(group, callback) {
  executeQuery('SELECT * FROM Groups WHERE name = ?;', [group.name], callback);
};

module.exports.findGroupLink = function(groupName, callback) {
  executeQuery('SELECT username FROM Links WHERE groupName = ?;', [groupName], callback);
};

module.exports.addGroupLink = function(groupName, username, callback) {
  executeQuery('INSERT INTO Links(groupName, username) VALUES(?, ?);', [groupName, username], callback);
};

module.exports.findUserLink = function(username, callback) {
  executeQuery('SELECT * FROM Links WHERE username = ?;', [username], callback);
};

module.exports.addBill = function(bill, callback) {
  executeQuery('INSERT INTO Bills(whoPaid, type, amount, billDate, groupName) VALUES(?, ?, ?, ?, ?);', [bill.whoPaid, bill.type, bill.amount, bill.billDate, bill.groupName], callback);
};

module.exports.getBills = function(groupName, callback) {
  executeQuery('SELECT * FROM Bills WHERE groupName = ?;', [groupName], callback);
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