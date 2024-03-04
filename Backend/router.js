import { Router } from "express";
import * as controller from "./controller.js"
import Auth from "./Auth.js";

const router=Router();

router.route("/addadmin").post(controller.AddAdmin);
router.route("/adminlogin").post(controller.AdminLogin);
router.route("/userAuth").get(Auth,controller.userAuth);
router.route("/addvehicle").post(controller.AddCar);
router.route("/addBike").post(controller.AddBike);
router.route("/getAllCar").get(controller.getAllCar);
router.route("/getAllBike").get(controller.getAllBike);
router.route("/getFullBikeDetails/:type/:id").get(controller.getVehicleDetails);
router.route("/deleteItem/:type/:id").delete(controller.deleteVehicle);



export default router;