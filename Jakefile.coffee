require('./models/vote')
database = require('./lib/database')

sequelize = database.get_sequelize()

namespace 'db', ->
  desc 'create database'
  task 'create', (param) ->
    sequelize.sync()

  desc 'drop database'
  task 'drop', (param) ->
    sequelize.drop()

  desc 'reset database'
  task 'rest', (param) ->
    sequelize.sync({force: true})
