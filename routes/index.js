var vote = require('../models/vote');

exports.index = function(req, res) {
  return res.render('index', {
    title: 'Vote'
  });
};
exports.mood = function(req, res) {
  return res.render('index/mood', {
    title: 'Vote'
  });
};
exports.cast = require('./cast');
exports.survey = require('./survey');