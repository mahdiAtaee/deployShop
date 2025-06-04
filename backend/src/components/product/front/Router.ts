import { Router } from 'express'
import Controller from './Controller'

const router: Router = Router()
const controller = new Controller()

router.get('/', controller.index)
router.get('/search', controller.search)
router.get('/:id', controller.find)
router.get('/:id/comments', controller.comments)
router.get('/category/:key', controller.categoryProducts)
router.get('/details/:id', controller.details)

export default router