export default (sequelize, DataTypes) => {
  return sequelize.define("split", {
    amount: DataTypes.FLOAT,
  });
};
