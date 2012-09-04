vote = require('../models/vote')
CALLBACK_FN = null

exports.register_cast_callback = (callback_fn) ->
  CALLBACK_FN = callback_fn

exports.index = (req, res) ->
  vote.create({mood: req.params.mood, ip_addr: req.ip})
  votes = vote.get_trending_votes((votes) ->
    CALLBACK_FN( {votes: votes} ) if CALLBACK_FN
  )
  res.json({message: 'Thanks for casting your mood'})

exports.trend = (req, res) ->
  votes = vote.get_trending_votes((votes) ->
    res.json({votes: votes})
  )
