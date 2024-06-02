const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const User = require("./userModel");

const CardInfo = sequelize.define("CardInfo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  card_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  card_holder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = CardInfo;
