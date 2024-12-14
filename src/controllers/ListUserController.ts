import { Request, Response } from "express";
import ListUserService from "../services/ListUserServices";

interface ErrorType {
    statusCode: number;
    msgError: string;
}

class ListUserController {
    async handle(req: Request, res: Response) {
        const userService = new ListUserService();
        
        try {
            const users = await userService.execute();
            return res.status(200).json(users); 
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


export default ListUserController;
