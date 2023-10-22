const db = require("../models");
const Employee = db.Employee;
var path = require("path");
var fs = require("fs");

exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(500).send({ error: "name is mandatory" });
  }
  if (!req.body.last_names) {
    return res.status(500).send({ error: "last name is mandatory" });
  }
  if (!req.body.email) {
    return res.status(500).send({ error: "email is mandatory" });
  }

  const employee = {
    name: req.body.name,
    last_names: req.body.last_names,
    email: req.body.email,
    employee_img: req.file ? req.file.filename : "",
  };

  Employee.create(employee)
    .then((createEmployee) => {
      res.send(createEmployee);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee.",
      });
    });
};

exports.findAll = (req, res) => {
  Employee.findAll()
    .then((allEmployee) => {
      res.send(allEmployee);
    })
    .catch((err) => {
      res.status(500).send({ message: "Server error. Couldn´t find employee" });
    });
};

exports.findOne = (req, res) => {
  let employeeId = req.params.id;

  Employee.findByPk(employeeId)
    .then((employee) => {
      res.send(employee);
    })
    .catch((err) => {
      res.status(500).send({ message: "Server error. Couldn´t find employee" });
    });
};

exports.deleteOne = (req, res) => {
  let employeeId = req.params.id;

  Employee.findOne({ where: { employee_id: employeeId } }).then((employee) => {
    const employeeImg = employee.employee_img;

    Employee.destroy({
      where: {
        employee_id: employeeId,
      },
    })
      .then((result) => {
        if (result === 1) {
          if (employeeImg) {
            const imagePath = path.join(
              __dirname,
              "../public/images",
              employeeImg
            );
            fs.unlink(imagePath, (err) => {
              if (err) {
                res
                  .status(500)
                  .send(
                    "Could not delete the employee image. Error detail:" + err
                  );
              }
            });
          }
          res.send({ message: "Empleado eliminado con éxito." });
        } else {
          res.status(404).send({ message: "Empleado no encontrado." });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          message: "Error del servidor. No se pudo eliminar al empleado.",
        });
      });
  });
};

exports.updateOne = (req, res) => {
  const employeeId = req.params.id;
  let updateEmployee;

  Employee.findOne({ where: { employee_id: employeeId } }).then((employee) => {
    const employeeImg = employee.employee_img;
    if (req.body.comprobar == "Yes") {
      updateEmployee = {
        name: req.body.name,
        last_names: req.body.last_names,
        email: req.body.email,
        employee_img: employeeImg,
      };
    } else {
      updateEmployee = {
        name: req.body.name,
        last_names: req.body.last_names,
        email: req.body.email,
        employee_img: req.file ? req.file.filename : "",
      };
    }

    Employee.findByPk(employeeId)
      .then((result) => {
        if (result) {
          if (employeeImg && req.body.comprobar == "No") {
            const imagePath = path.join(
              __dirname,
              "../public/images",
              employeeImg
            );
            fs.unlink(imagePath, (err) => {
              if (err) {
                res
                  .status(500)
                  .send(
                    "Could not delete the employee image. Error detail:" + err
                  );
              }
            });
          }
        } else {
          return res.status(404).send({ message: "Empleado no encontrado." });
        }
        res.status(200).send({ message: updateEmployee });
        return employee.update(updateEmployee);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          message: "Error del servidor. No se pudo actualizar al empleado.",
        });
      });
  });
};
