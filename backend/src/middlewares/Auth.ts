import { NextFunction, Request, Response } from "express";
import UnauthorizedException from "../components/exceptions/UnauthorizedException";
import { verify } from "../services/JWTService";


export const Auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers?.authorization
        if (!token) {
            throw new UnauthorizedException('Unauthorized!')
        }
        const verifyToken = verify(token as string)
        if(!verifyToken){
            throw new UnauthorizedException('Unauthorized!')
        }
        
        next()
    } catch (error) {
        next(error)
    }
}