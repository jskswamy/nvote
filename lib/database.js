var Sequelize = require("sequelize"),
		fs        = require("fs"),
    sequelize = null,
    configPath = process.cwd() + '/config'
    configFile = configPath + '/config.json',
    config = JSON.parse(fs.readFileSync(configFile));


exports.get_sequelize = function() {
  return sequelize || initialize_db();
};

function initialize_db() {
  return sequelize = new Sequelize(config.database, config.username, config.password, config);
};
