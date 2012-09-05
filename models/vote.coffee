Sequelize = require("sequelize")

database = require ('../lib/database')
sequelize = database.get_sequelize()
events = require("events")
eventEmitter = new events.EventEmitter()

Vote = sequelize.define('vote', {
  mood: Sequelize.BOOLEAN
  ip_addr: Sequelize.STRING
})

exports.on = (eventName, callbackFn) ->
  eventEmitter.on(eventName, callbackFn)

exports.build = (params) ->
  Vote.build(params)

exports.create = (params) ->
  Vote.create(params)
  get_trending_votes((votes) ->
    eventEmitter.emit('created', votes)
  )

get_trending_votes = (fn) ->
  Vote.findAll({limit: 100, order: 'id DESC'}).success(fn)

exports.get_trending_votes = get_trending_votes
