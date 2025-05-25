import { Router } from "express";
import Controller from './OrderController'
const orderController = new Controller()
const router: Router = Router()

router.get('/', orderController.index)
router.get("/:orderID", orderController.find)
router.patch("/:orderID", orderController.updateStatus)
export default router

