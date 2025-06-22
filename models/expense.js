export default (sequelize, DataTypes) => {
  return sequelize.define("expense", {
    description: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    split_type: DataTypes.STRING, // 'equal' or 'percentage'
  });
};
