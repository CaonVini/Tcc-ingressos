import { Request, Response } from "express";
import ParticipateEventService from "../services/ParticipateEventService";

class ParticipateEventController{
    async handle(req: Request, res: Response){

        const eventService = new ParticipateEventService();

        const userId = req.user.userId;
        
        const ticketId = Number(req.query.ticketId); 
        
        if (isNaN(ticketId)) {
            return res.status(400).send({ message: 'ticketId deve ser um número válido.' });
        }
        
        try {
            const particapeEvent = await eventService.execute({ userId, ticketId });
            res.status(201).send({ userId, ticketId });
        } catch (error) {
            res.status(500).send({ message: 'Erro ao participar do evento.' });
        }
        

    }
}

export default ParticipateEventController