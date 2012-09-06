var vote = require('../models/vote');

exports.index = function(req, res) {
  return res.render("index", {
    title: "Vote"
  });
};
