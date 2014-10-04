var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'checkmate'
});

dbConnection.connect();

module.exports.saveUser = function(user, callback) {

};

module.exports.retrieveUser = function(user, callback) {

};

module.exports.createGroup = function(group, callback) {

};

module.exports.updateGroup = function(group, callback) {

};

module.exports.retrieveGroup = function(group, callback) {

};