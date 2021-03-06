const Sequelize = require("sequelize");

module.exports = class Posts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(2200),
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING(15),
          allowNull: false,
          defaultValue: "강남, 서울",
        },
        state: {
          allowNull: false,
          type: Sequelize.STRING(8),
          defaultValue: "ACTIVE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Posts",
        tableName: "Posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      },
    );
  }

  static associate(db) {
    db.Posts.belongsTo(db.Users, { foreignKey: "userIdx", as: "user" });
    db.Posts.hasMany(db.PostImages, { foreignKey: "postIdx", as: "imgUrls" });
  }
};
