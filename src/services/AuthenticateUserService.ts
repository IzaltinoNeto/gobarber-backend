import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../models/User";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: Partial<User>;
    token: string;
}
export default class AuthenticateUserService {



    async execute({ email, password}:Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: {
                email
            }
        });

        if(!user) {
            throw new Error("Incorrect email/password combination.");
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new Error("Incorrect email/password combination.");

        }

        const token = sign({

        }, 'f13bcf2bd0bb530224ad2cf671bd59dd', {
            subject: user.id,
            expiresIn: '1d',

        });

        return {
            user,
            token,
        }

    }
}
