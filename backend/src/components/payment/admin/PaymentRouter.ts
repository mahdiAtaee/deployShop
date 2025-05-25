import { Router } from "express";
const router: Router = Router()
import controller from "./PaymentController";
const PaymentController = new controller()

router.get('/', PaymentController.index)

export default router