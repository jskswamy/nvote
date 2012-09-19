var vote = require('./models/vote'),
    database = require('./lib/database'),
    sequelize = database.get_sequelize();

namespace('db', function() {

  desc('create database');
  task('create', function(param) {
    return sequelize.sync();
  });

  desc('drop database');
  task('drop', function(param) {
    return sequelize.drop();
  });

  desc('reset database');
  return task('reset', function(param) {
    return sequelize.sync({
      force: true
    });
  });

});