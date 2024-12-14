import prisma from "../utils/db";
import bcrypt from "bcrypt";

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: CreateUserProps) {

        if (!name || !email || !password) {
            throw {
                statusCode: 400,
                msgError: "Preencha todos os campos."
            };
        }

        if (name.length < 2 || name.length > 50) {
            throw {
                statusCode: 400,
                msgError: "O nome deve ter entre 2 e 50 caracteres."
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw {
                statusCode: 400,
                msgError: "Email inválido."
            };
        }

        if (password.length < 8) {
            throw {
                statusCode: 400,
                msgError: "A senha deve ter pelo menos 8 caracteres."
            };
        }

        const userExists = await prisma.user.findMany({
            where: {
                email: email,
            },
        });

        if (userExists.length > 0) {
            throw {
                statusCode: 400,
                msgError: "Já existe um usuário cadastrado com esse email."
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return { name, email };
    }
}

export default CreateUserService;
