import { DataTypes } from "sequelize";
import sequilize from "../config/db";

const User = sequilize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    dob: {
      type: DataTypes.DATEONLY,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },

  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
