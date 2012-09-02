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
