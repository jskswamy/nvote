Sequelize = require("sequelize")
database = require ('../lib/database')

sequelize = database.get_sequelize()

Vote = sequelize.define('vote', {
  plus_one: Sequelize.BOOLEAN
})
