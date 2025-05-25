import { NextFunction, Request, Response } from "express";
import IUserRepository from "../repositories/IUserRepository";
import UserMongoRepository from "../repositories/UserMongoRepository";
import { verify } from "../../../services/JWTService";
import ServerException from "../../exceptions/ServerException";


export default class Controller {
    private readonly usersRepository: IUserRepository
    constructor() {
        this.usersRepository = new UserMongoRepository()
        this.addAddress = this.addAddress.bind(this)
    }

    public async addAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization
            const { id } = verify(token as string)
            const user = await this.usersRepository.findOne(id)
            let newAddresses = []
            if (user) {
                newAddresses = [...user.addresses, { ...req.body }]
            } else {
                newAddresses = [{ ...req.body }]
            }
            const result = await this.usersRepository.updateOne({ _id: id }, { addresses: newAddresses })
            console.log(result);
            
            if(!result){
                throw new ServerException('امکان ذخیره سازی آدرس جدید در حال حاضر مقدور نمی باشد')
            }
            res.send({
                success:true,
                message: 'آدرس جدید با موفقیت ثبت شد'
            })

        } catch (error) {
            next(error)
        }
    }
}