import { Router } from "express";
import Controller from './Controller'
import { Auth } from "../../../middlewares/Auth";
const controller = new Controller()
const router:Router = Router()
router.use(Auth)

router.post('/:userID/addresses', controller.addAddress)

export default router