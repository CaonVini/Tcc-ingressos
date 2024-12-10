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
            // Passando todos os dados para o serviço de criação
            const eventCreate = await eventService.execute({ eventName, date, price, localEvent, tags });
            
            // Enviando a resposta de sucesso com os detalhes do evento criado
            res.status(201).send({ eventName, date, price, localEvent, tags });
        } catch (error) {
            if (error && typeof error === 'object' && 'statusCode' in error && 'msgError' in error) {
                const { statusCode, msgError } = error as ErrorType;
                res.status(statusCode).json({ statusCode, msgError, errorType: "CustomError" });
            } else if (error instanceof Error) {
                // Captura erros nativos do JS e seus tipos
                res.status(500).json({
                    msgError: "Erro interno do servidor.",
                    errorType: error.name,  // Nome do erro (ex: TypeError, ReferenceError)
                    errorMessage: error.message // Mensagem do erro
                });
            } else {
                res.status(500).json({ msgError: "Erro desconhecido." });
            }
        }
    }
}

export default CreateEventController;
