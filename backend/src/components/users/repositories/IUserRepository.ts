import IRepository from "src/components/contracts/IRepository";
import IUser from "../model/IUser";

export default interface IUserRepository extends IRepository<IUser> {
    findByEmail(email: string, relations?: string[]): Promise<IUser | null>
}
