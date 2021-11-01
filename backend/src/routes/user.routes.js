import express from "express";
import userCtrl from "../controller/user.controller"

const router = express.Router();

router.route("/api/users").post(userCtrl.createUser)

router.route("/api/users/:userId")
    .delete(userCtrl.removeUser)
    .put(userCtrl.updatePassword)
    .post(userCtrl.chackPassword)
    .get(userCtrl.getInfo)

router.route("/api/users/edit/:userId").put(userCtrl.updateProfile)

router.param("userId", userCtrl.userByID);

export default router;