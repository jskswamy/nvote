vote = require('../models/vote')

exports.index = (req, res) ->
  res.render "index",
    title: "Vote"

