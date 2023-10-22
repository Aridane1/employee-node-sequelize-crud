const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Employee = require("./employees.model.js")(sequelize, Sequelize);
db.PersonalInfo = require("./personal-info.model.js")(sequelize, Sequelize);
db.EmploymentInfo = require("./employment-info.models.js")(
  sequelize,
  Sequelize
);

db.Employee.hasOne(db.PersonalInfo, { foreignKey: "employee_id" });
db.PersonalInfo.belongsTo(db.Employee, { foreignKey: "employee_id" });

db.Employee.hasOne(db.EmploymentInfo, { foreignKey: "employee_id" });
db.EmploymentInfo.belongsTo(db.Employee, { foreignKey: "employee_id" });

module.exports = db;
