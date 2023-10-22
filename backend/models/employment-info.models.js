module.exports = (sequelize, Sequelize) => {
  const EmploymentInfo = sequelize.define("employment_information", {
    laboral_info_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: Sequelize.INTEGER,
    },
    booth: {
      type: Sequelize.STRING,
    },
    salary: {
      type: Sequelize.DECIMAL(10, 2),
    },
  });

  return EmploymentInfo;
};
