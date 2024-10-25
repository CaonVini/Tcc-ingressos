import prisma from "../utils/db";

interface ParticipateEventProps{
    userId: number,
    ticketId: number,
}


class ParticipateEventService{
    async execute({ userId, ticketId }:ParticipateEventProps){
        const event = await prisma.event.findUnique({
            where: { id: ticketId },
          });

          if (!event) {
            throw new Error('Evento não encontrado');
          }

          const ticketUser = await prisma.ticketUser.create({
            data: {
              userId,
              ticketId: event.id,
            },
          });

    }
}

export default ParticipateEventService