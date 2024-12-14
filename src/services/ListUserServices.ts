import prisma from "../utils/db";

class ListUserService {
    async execute() {
        try {
            const users = await prisma.user.findMany();
            const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
            return usersWithoutPassword;
        } catch (error: any) {
            if (error instanceof Error) {
                throw {
                    statusCode: 500, 
                    msgError: "Erro ao buscar usuários. Tente novamente mais tarde."
                };
            } 
            }
        }
    }

export default ListUserService;