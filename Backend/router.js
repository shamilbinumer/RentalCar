import { Router } from "express";
import * as controller from "./controller.js"

const router=Router();

router.route("/addadmin").post(controller.AddAdmin);


export default router;