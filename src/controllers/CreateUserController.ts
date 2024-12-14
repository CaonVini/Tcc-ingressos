import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";

interface ErrorType {
    statusCode: number;
    msgError: string;
}


class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body as { name: string; email: string; password: string };
        const userService = new CreateUserService();

        try {
            const user = await userService.execute({ name, email, password });
            res.status(201).send({ name, email });
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

export { CreateUserController };
