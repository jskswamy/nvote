vote = require('../models/vote')

exports.index = (req, res) ->
  vote.create({mood: req.params.mood, ip_addr: req.ip})
  res.json({message: 'Thanks for casting your mood'})

exports.trend = (req, res) ->
  votes = vote.get_trending_votes((votes) ->
    res.json({votes: votes})
  )
