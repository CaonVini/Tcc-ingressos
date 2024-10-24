import prisma from "../utils/db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

interface LoginUserProps{
    email: string,
    password: string
}

class LoginUserService{
    async execute({ email, password}: LoginUserProps){

        if (!email || !password) {
            throw {
                statusCode: 400,
                msgError: "Email e senha são obrigatórios."
            };
        }

        const user = await prisma.user.findFirst({where:{
            email: email,
        }})

        if (!user) {
            throw {
                statusCode: 404,
                msgError: "Usuário ou senha não encontrado.."
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); 
        if (!isPasswordValid) {
            throw {
                statusCode: 401,
                msgError: "Usuário ou senha não encontrado."
            };
        }

        const jwtSecret = process.env.JWT_SECRET_TOKEN;

        if (!jwtSecret) {
            throw {
                statusCode: 500,
                msgError: "JWT secret is not defined."
            };
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret,  {
            expiresIn: "1h" 
        });

        return { token} ;
    }

}

export default LoginUserService;