import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any; // Defina o tipo de acordo com suas necessidades
        }
    }
}

function verifyTokenAccess(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ msgError: "Token não fornecido." });
    }

    const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
    if (!JWT_SECRET_TOKEN) {
        return res.status(500).json({ msgError: "Erro de configuração do servidor." });
    }

    const bearerToken = token.split(' ')[1];

    jwt.verify(bearerToken, JWT_SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({ msgError: "Token inválido." });
        }
        
        req.user = decoded; 
        next(); 
    });
}

export default verifyTokenAccess;
