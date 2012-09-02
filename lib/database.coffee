Sequelize = require("sequelize")
sequelize = null

exports.get_sequelize = () ->
  return sequelize || initialize_db()

initialize_db = () ->
  sequelize = new Sequelize('nvote_dev','root','', {
    host: 'localhost'
  })
