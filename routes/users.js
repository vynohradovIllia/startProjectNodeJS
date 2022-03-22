  const express = require("express");
  const userGet = require("../controllers/users/get");
  const userPost = require("../controllers/users/post");
  const userDelete = require("../controllers/users/delete")
  const userRouter = express.Router();

  userRouter.use("/addUser", userPost.addUser);
  userRouter.use("/getUsers", userGet.getUsers);
  userRouter.use("/deleteUser/:id", userDelete.deleteUser);
  //userRouter.use("/patchUser", userController.patchUser);

  module.exports = userRouter;