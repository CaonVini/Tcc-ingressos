import prisma from "../utils/db";

interface ParticipatingEventsProps{
    userId: number
}


class ParticipatingEventsService{
    async execute({userId}:ParticipatingEventsProps){

        try{
            const participatingEvent = await prisma.ticketUser.findMany({where: {
                userId: userId
            }})
            return participatingEvent
        } catch (error: any) {
            if (error instanceof Error) {
                throw {
                    statusCode: 500, // Erro interno do servidor
                    msgError: "Erro ao listar eventos do usuario. Tente novamente mais tarde."
                };
            } 
            }

    }
}

export default ParticipatingEventsService