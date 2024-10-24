import { Request, Response } from "express";
import DeleteUserService from "../services/DeleteUserService";

interface ErrorType {
    statusCode: number;
    msgError: string;
}

class DeleteUserController {
    async handle(req: Request, res: Response) {
        const userService = new DeleteUserService();

        const { id } = req.query as { id?: string };
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msgError: "ID do usuário é necessário e deve ser um número." });
        }

        try {
            const userId = Number(id); 
            await userService.execute({ id: userId });
            return res.status(200).json({ msg: "Usuário deletado com sucesso." });
        } catch (error: any) {
            if (error && error.statusCode && error.msgError) {
                return res.status(error.statusCode).json({ msgError: error.msgError });
            } else {
                console.error("Erro interno:", error); 
                return res.status(500).json({ msgError: "Erro interno do servidor." });
            }
        }
    }
}

export { DeleteUserController };
