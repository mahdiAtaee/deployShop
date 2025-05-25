import { NextFunction, Request, Response } from "express";
import AuthService from "../../services/AuthService";
import { hashPassword } from "../../services/HashService";
import User from "../users/model/User";
import { sign, verify } from "../../services/JWTService";
import UsersTransformer from "../users/admin/usersTransformer";
import IUser from "../users/model/IUser";

class authController {
    private readonly authService
    constructor() {
        this.authService = new AuthService()
        this.authenticate = this.authenticate.bind(this)
        this.register = this.register.bind(this)
        this.check = this.check.bind(this)
    }
    /**
     * async authenticate
     */
    public async authenticate(req: Request, res: Response, next: NextFunction) {
        const usersTransformer = new UsersTransformer()
        try {
            const { email, password } = req.body
            const user = await this.authService.authentication(email, password)
            if (!user) {
                res.status(404).send({
                    success: false,
                    message: 'اطلاعات ورود صحیح نمی باشد'
                })
            }
            let id: string = ''
            if (user instanceof User) {
                id = user.id
            }
            res.send({
                success: true,
                user: usersTransformer.transform(user as IUser),
                message: "ورود با موفقیت انجام شد",
                token: sign({ id })
            })
        } catch (error) {
            next(error)
        }
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, email, password } = req.body
            const hashedPassword = hashPassword(password)
            const authResult = await this.authService.register(firstName, lastName, email, hashedPassword)
            if (!authResult) {
                res.status(500).send({
                    success: false,
                    message: 'در فرایند ثبت نام مشکلی بوجود آمده است. لطفا دوباره امتحان نمایید'
                })
            }
            res.send({
                success: true,
                message: "ورود با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }

    public async check(req: Request, res: Response, next: NextFunction) {
        try {
            const { authToken } = req.body
            const result = verify(authToken)
            if (!result) {
                res.status(400).send({
                    success: false,
                    message: 'token is not valid!'
                })
            }
            res.send({
                success: true,
                message: 'token is valid!'
            })
        } catch (error) {
            next(error)
        }
    }
}

export default authController