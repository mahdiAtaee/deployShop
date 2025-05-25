import IUser from "../components/users/model/IUser";
import IUserRepository from "../components/users/repositories/IUserRepository";
import UserMongoRepository from "../components/users/repositories/UserMongoRepository";
import { comparePassword } from "./HashService";

class AuthService {
    private readonly usersRepository: IUserRepository
    constructor() {
        this.usersRepository = new UserMongoRepository()
        this.authentication = this.authentication.bind(this)
        this.register = this.register.bind(this)
    }

    public async authentication(email: string, password: string): Promise<IUser | boolean> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            return false
        }
        if (comparePassword(password, user.password)) {
            return user
        }
        return false
    }


    public async register(firstName: string, lastName: string, email: string, password: string) {
        const result = await this.usersRepository.create({ firstName, lastName, email, password })
        if (!result) {
            return false
        }
        return true
    }
}

export default AuthService