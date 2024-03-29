import { getRepository } from 'typeorm';
import User from '../model/User';
import { compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface RequestDTO {
    email: string;
    password: string;
}

interface ResponseDTO{
    user: User;
    token: string;
}

export default class AuthenticateUserService {
    public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } })

        if (!user) {
            throw new AppError("Incorrect email/password combination",401);
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("Incorrect email/password combination",401);
        }
        const {secret, expiresIn } = authConfig.jwt
 
        const token = sign({},secret,{
            subject: user.id,
            expiresIn: expiresIn,
        })

        return {user, token};

    }
}