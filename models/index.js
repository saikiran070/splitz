import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models
db.User = (await import("./user.js")).default(sequelize, Sequelize);
db.Group = (await import("./group.js")).default(sequelize, Sequelize);
db.GroupUser = (await import("./groupUser.js")).default(sequelize, Sequelize);
db.Expense = (await import("./expense.js")).default(sequelize, Sequelize);
db.Split = (await import("./split.js")).default(sequelize, Sequelize);

// associations
db.Group.belongsToMany(db.User, { through: db.GroupUser });
db.User.belongsToMany(db.Group, { through: db.GroupUser });

db.Expense.belongsTo(db.Group);
db.Expense.belongsTo(db.User, { as: "payer" });
db.Expense.hasMany(db.Split);

db.Split.belongsTo(db.User);
db.Split.belongsTo(db.Expense);

export default db;
