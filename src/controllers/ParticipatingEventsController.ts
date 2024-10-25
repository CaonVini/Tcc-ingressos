import { Request, Response } from "express";
import ParticipatingEventsService from "../services/ParticipatingEventsService";

class ParticipatingEventsController{
    async handle(req: Request, res: Response){

        const eventService = new ParticipatingEventsService();

        const userId = req.user.userId;

        try {
            const eventsParticipatings = await eventService.execute({ userId});
            res.status(201).send({ eventsParticipatings });
        } catch (error) {
            res.status(500).send({ message: 'Erro ao listar eventos do usuario.' });
        }
    }
}

export default ParticipatingEventsController