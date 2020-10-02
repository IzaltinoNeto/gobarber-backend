import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import authConfig from "../config/auth";
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

        }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,

        });

        return {
            user,
            token,
        }

    }
}
