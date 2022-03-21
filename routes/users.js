  const express = require("express");
  const userController = require("../controllers/userController.js");
  const userRouter = express.Router();

  userRouter.use("/addUser", userController.addUser);
  userRouter.use("/getUsers", userController.getUsers);
  userRouter.use("/deleteUser", userController.deleteUser);
  //userRouter.use("/patchUser", userController.patchUser);

  module.exports = userRouter;