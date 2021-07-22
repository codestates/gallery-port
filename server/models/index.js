'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};
require('dotenv').config();

const options = { host: config.host, dialect: config.dialect, logging: false };
const sequelize = new Sequelize(config.database, config.username, config.password, options);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Project = require('./project')(sequelize, Sequelize);
db.Stack = require('./stack')(sequelize, Sequelize);
db.Content = require('./project_content')(sequelize, Sequelize);

db.Project.hasMany(db.Content, {foreignKey: 'project_id', sourceKey:'id'});
db.Content.belongsTo(db.Project, {foreignKey: 'project_id', targetKey:'id'});

db.StackForProject = sequelize.define('stack_for_project', {id: {
    type: Sequelize.INTEGER,
    primaryKey: true, 
    autoIncrement: true
  }}, {
    timestamps: false
});
db.Project.belongsToMany(db.Stack, {through: db.StackForProject, foreignKey:"project_id"});
db.Stack.belongsToMany(db.Project, {through: db.StackForProject, foreignKey:"stack_id"});

db.ProjectByUser = sequelize.define('project_by_user', {id: {
    type: Sequelize.INTEGER,
    primaryKey: true, 
    autoIncrement: true
  }}, {
    timestamps: false
});
db.User.belongsToMany(db.Project, {through: db.ProjectByUser, foreignKey: "user_id"});
db.Project.belongsToMany(db.User, {through: db.ProjectByUser, foreignKey: "project_id"});

module.exports = db;