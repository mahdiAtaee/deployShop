import { Router } from "express";
import Controller from "./CommentController";
import { Auth } from "../../../middlewares/Auth";
const CommentController = new Controller();
const router: Router = Router();
router.use(Auth)
router.post("/", CommentController.store)

export default router;
