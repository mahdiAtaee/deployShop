import { Router } from "express";
import Controller from './Controller'
const router: Router = Router()
const controller = new Controller()

router.get('/', controller.list)


export default router