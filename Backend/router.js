import { Router } from "express";
import * as controller from "./controller.js"
import Auth from "./Auth.js";

const router=Router();

router.route("/addadmin").post(controller.AddAdmin);
router.route("/adminlogin").post(controller.AdminLogin);
router.route("/userAuth").get(Auth,controller.userAuth);
router.route("/addvehicle").post(controller.AddCar);
router.route("/addBike").post(controller.AddBike);
router.route("/getAllVehicle/:type").get(controller.getAllRecords);
router.route("/getFullBikeDetails/:type/:id").get(controller.getVehicleDetails);
router.route("/deleteItem/:type/:id").delete(controller.deleteVehicle);
router.route("/editItem/:type/:id").patch(controller.editDetails);
//////////////////customerModule/////////////////////////
router.route("/addcust").post(controller.AddCustomer);
router.route("/custlogin").post(controller.custLogin);
router.route("/custAuth").get(Auth,controller.CustAuth);
router.route("/getOneCust/:id").get(controller.getOneCust);
router.route("/getAllCust").get(controller.getAllCust);




export default router;