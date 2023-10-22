module.exports = (app) => {
  const employeesInfo = require("../controllers/employment-info.controller.js");
  var router = require("express").Router();
  router.post("/", employeesInfo.create);
  router.get("/", employeesInfo.findAll);
  router.get("/:id", employeesInfo.findOne);
  router.delete("/:id", employeesInfo.deleteOne);
  router.put("/:id", employeesInfo.updateOne);
  app.use("/api/employment_info", router);
};
