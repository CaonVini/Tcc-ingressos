import { Request, Response } from "express";
import LoginUserService from "../services/LoginUserService";


interface ErrorType {
    statusCode: number;
    msgError: string;
}

class LoginUserController{
    async handle(req: Request, res: Response){
        const userService = new LoginUserService();

        const { email, password} = req.body

        try {
            const user = await userService.execute({email, password });
            const token = user.token
            res.status(201).json({"Acess": true, "UserMail": email, "AcessToken": token});
        } catch (error) {
            if (error && typeof error === 'object' && 'statusCode' in error && 'msgError' in error) {
                const { statusCode, msgError } = error as ErrorType;
                res.status(statusCode).json({ statusCode, msgError });
            } else {
                res.status(500).json({ msgError: "Erro interno do servidor." });
            }
        }
    }

    }

export default LoginUserController;
