import prisma from "../utils/db";

class ListEventService {
    async execute() {
        try {
            const events = await prisma.event.findMany();
            return events;
        } catch (error: any) {
            if (error instanceof Error) {
                throw {
                    statusCode: 500, 
                    msgError: "Erro ao buscar eventos. Tente novamente mais tarde."
                };
            } 
            }
        }
    }

export default ListEventService;
