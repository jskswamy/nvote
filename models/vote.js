var Sequelize = require("sequelize"),
    database = require('../lib/database'),
    sequelize = database.get_sequelize(),
    events = require("events"),
    eventEmitter = new events.EventEmitter();

Vote = sequelize.define('vote', {
  mood: Sequelize.BOOLEAN,
     ip_addr: Sequelize.STRING
});

exports.on = function(eventName, callbackFn) {
  return eventEmitter.on(eventName, callbackFn);
};

exports.build = function(params) {
  return Vote.build(params);
};

exports.create = function(params) {
  Vote.create(params);
  return get_trending_votes(function(votes) {
    return eventEmitter.emit('created', votes);
  });
};

get_trending_votes = function(fn) {
  return Vote.findAll({
    limit: 100,
         order: 'id DESC'
  }).success(fn);
};

exports.get_trending_votes = get_trending_votes;
