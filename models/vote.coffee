Sequelize = require("sequelize")
database = require ('../lib/database')

sequelize = database.get_sequelize()

Vote = sequelize.define('vote', {
  mood: Sequelize.BOOLEAN
  ip_addr: Sequelize.STRING
})

exports.build = (params) ->
  Vote.build(params)

exports.create = (params) ->
  Vote.create(params)

exports.get_trending_votes = (fn) ->
  Vote.findAll({limit: 100, order: 'id DESC'}).success(fn)
