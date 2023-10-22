module.exports = (app) => {
  const personalInfo = require("../controllers/personal-info.controller");
  var router = require("express").Router();
  router.post("/", personalInfo.create);
  router.get("/", personalInfo.findAll);
  router.get("/:id", personalInfo.findOne);
  router.delete("/:id", personalInfo.deleteOne);
  router.put("/:id", personalInfo.updateOne);
  app.use("/api/personal_info", router);
};
