import { Router } from "express";
import * as controller from "./controller.js"
import Auth from "./Auth.js";

const router=Router();

router.route("/addadmin").post(controller.AddAdmin);
router.route("/adminlogin").post(controller.AdminLogin);
router.route("/userAuth").get(Auth,controller.userAuth);
router.route("/addvehicle").post(controller.AddCar);
router.route("/addBike").post(controller.AddBike);


export default router;