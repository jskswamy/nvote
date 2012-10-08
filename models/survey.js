var Sequelize = require('sequelize'),
    database = require('../lib/database'),
    sequelize = database.get_sequelize(),
    events = require("events"),
    eventEmitter = new events.EventEmitter();

Survey = sequelize.define('survey', {
  name: Sequelize.STRING,
  launch_time: Sequelize.DATE
});

exports.build = function(params) {
  return Survey.build(params);
};

exports.create = function(params) {
  Vote.create(params);
  return eventEmitter.emit('created');
};

exports.get_trending_votes = function(fn) {
  return Vote.findAll({
    limit: 100,
         order: 'id DESC'
  }).success(fn);
};
