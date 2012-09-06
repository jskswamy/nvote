var vote = require('../models/vote');

exports.index = function(req, res) {
  vote.create({
    mood: req.params.mood,
    ip_addr: req.ip
  });
  return res.json({
    message: 'Thanks for casting your mood'
  });
};

exports.trend = function(req, res) {
  var votes;
  return votes = vote.get_trending_votes(function(votes) {
    return res.json({
      votes: votes
    });
  });
};
