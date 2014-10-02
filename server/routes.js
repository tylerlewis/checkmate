'use strict';

module.exports = function(app) {

  app.use('/api/users', require('./api/users'));
  app.use('/api/groups', require('./api/groups'));
  
};