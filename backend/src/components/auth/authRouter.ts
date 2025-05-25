import { Router } from "express";
import AuthController from './authController'
const controller = new AuthController()
const router: Router = Router()

router.post('/login', controller.authenticate)
router.post('/register', controller.register)
router.post('/check', controller.check)

export default router