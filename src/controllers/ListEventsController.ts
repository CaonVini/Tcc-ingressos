import { Request, Response } from "express";
import ListEventService from "../services/ListEventsService";
interface ErrorType {
    statusCode: number;
    msgError: string;
}

class ListEventController {
    async handle(req: Request, res: Response) {
        const eventService = new ListEventService();
        
        try {
            const events = await eventService.execute();
            return res.status(200).json(events); 
        } catch (error: any) {
            if (error && error.statusCode && error.msgError) {
                return res.status(error.statusCode).json({ msgError: error.msgError });
            } else {
                console.error("Erro interno:", error); 
                return res.status(500).json({ msgError: "Erro interno do servidor." });
            }
        }
    }
}


export default ListEventController;
