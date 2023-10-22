const db = require("../models");
const PersonalInfo = db.PersonalInfo;
const Employee = db.Employee;

exports.create = (req, res) => {
  if (!req.body.direction) {
    res.status(500).send({ error: "direction is mandatory" });
  }
  if (!req.body.phone) {
    res.status(500).send({ error: "phone is mandatory" });
  }

  Employee.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((employee) => {
      if (employee) {
        const personalInfo = {
          employee_id: employee.employee_id,
          direction: req.body.direction,
          phone: req.body.phone,
        };
        PersonalInfo.create(personalInfo)
          .then((createPersonalInfo) => {
            res.send(createPersonalInfo);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the personal info.",
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
  PersonalInfo.findAll()
    .then((allPersonalInfo) => {
      res.send(allPersonalInfo);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Server error. Couldn´t find personal info" });
    });
};

exports.findOne = (req, res) => {
  let personalIndoId = req.params.id;

  PersonalInfo.findByPk(personalIndoId)
    .then((personalInfo) => {
      res.send(personalInfo);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Server error. Couldn´t find personal info" });
    });
};

exports.deleteOne = (req, res) => {
  let id = req.params.id;
  PersonalInfo.destroy({
    where: {
      info_personal_id: id,
    },
  })
    .then((result) => {
      if (result === 1) {
        res.send({ message: "Informacion personal eliminado con éxito." });
      } else {
        res.status(404).send({ message: "Infor personal no encontrado." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          "Error del servidor. No se pudo eliminar la informacion personal.",
      });
    });
};

exports.updateOne = (req, res) => {
  let personalInfoId = req.params.id;
  let updatePersonalInfo = req.body;

  PersonalInfo.findOne({ where: { employee_id: personalInfoId } })
    .then((personalInfo) => {
      if (!personalInfo) {
        return res
          .status(404)
          .send({ message: "Informacion personal no encontrado." });
      }
      return personalInfo.update(updatePersonalInfo);
    })
    .then((updatedPersonalInfo) => {
      res.send({ message: updatedPersonalInfo });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          "Error del servidor. No se pudo actualizar la informacion personal.",
      });
    });
};
