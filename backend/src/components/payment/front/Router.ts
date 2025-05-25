import { Router } from 'express'
import Controller from './Controller'
const controller = new Controller()
const router: Router = Router()

router.get('/gateways', controller.gatewaysList)

export default router