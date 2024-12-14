import { Request, Response } from "express";
import CreateEventService from "../services/CreateEventService";
import { TagsEvent } from "@prisma/client";

interface ErrorType {
    statusCode: number;
    msgError: string;
}

class CreateEventController {
    async handle(req: Request, res: Response) {
        const { eventName, date, price, localEvent, tags } = req.body as {
            eventName: string;
            date: number;
            price: number;
            localEvent: string;
            tags: TagsEvent;
        };

        const eventService = new CreateEventService();

        try {
            const eventCreate = await eventService.execute({ eventName, date, price, localEvent, tags });
            
            res.status(201).send({ eventName, date, price, localEvent, tags });
        } catch (error) {
            if (error && typeof error === 'object' && 'statusCode' in error && 'msgError' in error) {
                const { statusCode, msgError } = error as ErrorType;
                res.status(statusCode).json({ statusCode, msgError, errorType: "CustomError" });
            } else if (error instanceof Error) {
                res.status(500).json({
                    msgError: "Erro interno do servidor.",
                    errorType: error.name, 
                    errorMessage: error.message 
                });
            } else {
                res.status(500).json({ msgError: "Erro desconhecido." });
            }
        }
    }
}

export default CreateEventController;
