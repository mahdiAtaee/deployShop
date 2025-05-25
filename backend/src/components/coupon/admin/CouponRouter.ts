import { Router } from "express";
import CouponController from './CouponController'
const router: Router = Router()
const controller = new CouponController()

router.get('/', controller.index)
router.post('/', controller.store)

export default router