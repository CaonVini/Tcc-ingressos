import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}

function verifyTokenAccess(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ msgError: "Token não fornecido." });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msgError: "Token não fornecido." });
    }

    const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
    if (!JWT_SECRET_TOKEN) {
        console.error("JWT_SECRET_TOKEN não está definido.");
        return res.status(500).json({ msgError: "Erro de configuração do servidor." });
    }

    jwt.verify(token, JWT_SECRET_TOKEN, (err, decodedToken) => {
        if (err) {
            console.error("Erro ao verificar o token:", err);
            return res.status(403).json({ msgError: "Token inválido." });
        }

        console.log("Token decodificado:", decodedToken); 
        req.user = decodedToken; 
        next(); 
    });
}

export default verifyTokenAccess;
