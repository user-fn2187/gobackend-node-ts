import User from '../model/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError'

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: RequestDTO): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExist = await usersRepository.findOne({
            where: { email },
        });

        if(checkUserExist){
            throw new AppError("Email address already used.");
        }

        const hashedPassword = await hash(password,8)

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}