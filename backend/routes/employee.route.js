module.exports = (app) => {
  const employees = require("../controllers/employee.controller.js");
  var upload = require("../multer/upload.js");
  var router = require("express").Router();

  router.post("/", upload.single("file"), employees.create);
  router.get("/", employees.findAll);
  router.get("/:id", employees.findOne);
  router.delete("/:id", employees.deleteOne);
  router.put("/:id", upload.single("file"), employees.updateOne);

  app.use("/api/employees", router);
};
