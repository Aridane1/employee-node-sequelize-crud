const db = require("../models");
const EmploymentInfo = db.EmploymentInfo;
const Employee = db.Employee;
exports.create = (req, res) => {
  Employee.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((employee) => {
      if (employee) {
        const employeeInfo = {
          employee_id: employee.employee_id,
          booth: req.body.booth,
          salary: req.body.salary,
        };
        EmploymentInfo.create(employeeInfo)
          .then((createEmploymentInfo) => {
            res.send(createEmploymentInfo);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the employee info.",
            });
          });
      } else {
        console.log("Empleado no encontrado.");
      }
    })
    .catch((error) => {
      console.error("Error al buscar empleado:", error);
    });
};

exports.findAll = (req, res) => {
  EmploymentInfo.findAll()
    .then((allEmploymentInfo) => {
      res.send(allEmploymentInfo);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Server error. Couldn´t find employee info" });
    });
};

exports.findOne = (req, res) => {
  let employmentId = req.params.id;

  EmploymentInfo.findByPk(employmentId)
    .then((employmentInfo) => {
      res.send(employmentInfo);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Server error. Couldn´t find employee info" });
    });
};

exports.deleteOne = (req, res) => {
  let id = req.params.id;

  EmploymentInfo.destroy({
    where: {
      laboral_info_id: id,
    },
  })
    .then((result) => {
      if (result === 1) {
        res.send({ message: "Info Empleado eliminado con éxito." });
      } else {
        res.status(404).send({ message: "Info Empleado no encontrado." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Error del servidor. No se pudo eliminar la info empleado.",
      });
    });
};

exports.updateOne = (req, res) => {
  const employmentInfoId = req.params.id;
  const updatedemploymentInfoData = req.body;

  EmploymentInfo.findOne({ where: { employee_id: employmentInfoId } })
    .then((employmentInfo) => {
      if (!employmentInfo) {
        return res
          .status(404)
          .send({ message: "Info Empleado no encontrado." });
      }

      return employmentInfo.update(updatedemploymentInfoData);
    })
    .then((updatedInfoEmployment) => {
      res.send({ message: updatedInfoEmployment });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Error del servidor. No se pudo actualizar la info empleado.",
      });
    });
};
