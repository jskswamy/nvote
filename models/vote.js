var Sequelize = require('sequelize'),
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
  return eventEmitter.emit('created');
};

exports.get_trending_votes = function(fn) {
  return sequelize.query('SELECT * FROM votes WHERE votes.createdAt = (SELECT MAX(v2.createdAt) FROM votes v2 WHERE v2.ip_addr = votes.ip_addr)', Vote).success(fn);
};
