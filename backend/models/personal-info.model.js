module.exports = (sequelize, Sequelize) => {
  const PersonalInfo = sequelize.define("personal_info", {
    info_personal_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: Sequelize.INTEGER,
    },
    direction: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
  });

  return PersonalInfo;
};
