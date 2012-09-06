var Sequelize = require("sequelize"),
    sequelize = null;

exports.get_sequelize = function() {
  return sequelize || initialize_db();
};

function initialize_db() {
  return sequelize = new Sequelize('nvote_dev', 'root', '', {
    host: 'localhost'
  });
};
