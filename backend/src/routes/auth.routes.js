import express from "express";
import authCtrl from "../controller/auth.controller"

const router = express.Router();

router.route("/auth/signIn").post(authCtrl.signIn)
router.route("/auth/signOut").get(authCtrl.signOut)

export default router;