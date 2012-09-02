vote = require('../models/vote')

exports.index = (req, res) ->
  vote.create({mood: req.params.mood, ip_addr: req.ip})
  res.json({message: 'Thanks for casting your mood'})
