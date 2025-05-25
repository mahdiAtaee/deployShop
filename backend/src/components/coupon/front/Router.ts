import { Router } from "express";
import Controller from './Controller'
const controller = new Controller()
const router: Router = Router()

router.post('/validation', controller.validation)

export default router