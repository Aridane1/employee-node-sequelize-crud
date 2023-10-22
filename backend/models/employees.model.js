module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    employee_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    last_names: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    employee_img: {
      type: Sequelize.STRING,
    },
  });

  return Employee;
};
