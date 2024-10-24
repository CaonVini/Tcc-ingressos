import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import prisma from "../utils/db";
import { UserRole } from "@prisma/client";
dotenv.config();

async function checkUserRole(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        return res.status(401).json({ msgError: "Usuário não autenticado." });
    }

    const idUser = req.user.userId

    const user = await prisma.user.findFirst({
        where: {
            id: idUser,
        },
        select: {
            role: true,
        }
    });
    
    const userRole = user?.role;

    if(userRole === UserRole.USER){
        return res.status(403).json({ msgError: "Acesso negado: Permissão insuficiente." });
    }

    if(userRole === UserRole.ADMIN){
        next();
    }
   
    return { userRole }

}

export default checkUserRole;