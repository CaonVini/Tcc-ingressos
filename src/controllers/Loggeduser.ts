import { Request, Response } from "express";
import prisma from "../utils/db";

class LoggedUserController {
    async handle(req: Request, res: Response) {
        // O middleware verifyTokenAccess já decodificou o token e colocou em req.user

        if (!req.user) {
            return res.status(401).json({ msgError: "Usuário não autenticado." });
        }

        const idUser = req.user.userId

        const user = await prisma.user.findFirst({
            where: {
                id: idUser,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        
        const userId = req.user.userId; 
        
        return res.status(200).json({ 
            msg: "Usuário autenticado.",  
            userId: userId, 
            user: user 
        });
    }
}

export default LoggedUserController;
