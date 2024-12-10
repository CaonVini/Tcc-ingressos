import prisma from "../utils/db";
import { TagsEvent } from "@prisma/client";

interface CreateEventProps {
    eventName: string;
    date: number;
    price: number;
    localEvent: string;
    tags: TagsEvent;
}

class CreateEventService {
    async execute({ eventName, date, price, localEvent, tags }: CreateEventProps) {
        if (!eventName || !date || !price || !localEvent || !tags) {
            throw {
                statusCode: 400,
                msgError: "Preencha todos os campos."
            };
        }

        if (eventName.length < 2 || eventName.length > 50) {
            throw {
                statusCode: 400,
                msgError: "O nome deve ter entre 2 e 50 caracteres."
            };
        }

        if (price <= 0) {
            throw {
                statusCode: 400,
                msgError: "O preço deve ser maior que zero."
            };
        }

        if (localEvent.length < 2 || localEvent.length > 100) {
            throw {
                statusCode: 400,
                msgError: "O local do evento deve ter entre 2 e 100 caracteres."
            };
        }

        // Validação de tags se você estiver usando um tipo de enum específico
        const validTags = ["MUSICA", "TEATRO", "COMEDIA", "PALESTRA"];
        if (!validTags.includes(tags)) {
            throw {
                statusCode: 400,
                msgError: "Tag inválida. Escolha uma das tags válidas: MUSICA, ENTRETENIMENTO, COMEDIA, PALESTRA."
            };
        }

        const cleanedDate = date.toString().replace(/[-/.]/g, ''); 
        
        if (cleanedDate.length !== 8) {
            throw {
                statusCode: 400,
                msgError: "A data deve ter o formato ddMMyyyy com 8 dígitos."
            };
        }

        const day = parseInt(cleanedDate.substring(0, 2), 10);
        const month = parseInt(cleanedDate.substring(2, 4), 10) - 1; // Janeiro é 0 no JS
        const year = parseInt(cleanedDate.substring(4), 10);

        const eventDate = new Date(year, month, day);

        if (isNaN(eventDate.getTime()) || day !== eventDate.getDate() || month !== eventDate.getMonth()) {
            throw {
                statusCode: 400,
                msgError: "A data fornecida não é válida."
            };
        }

        const currentDate = new Date();
        if (eventDate < currentDate) {
            throw {
                statusCode: 400,
                msgError: "A data do evento não pode ser anterior à data atual."
            };
        }

        const existingEvent = await prisma.event.findFirst({
            where: {
                eventName: eventName,
                date: eventDate 
            }
        });

        if (existingEvent) {
            throw {
                statusCode: 400,
                msgError: "Já existe um evento com este nome e data."
            };
        }

        const event = await prisma.event.create({
            data: {
                eventName,
                date: eventDate, 
                price: Number(price),
                localEvent,
                tags
            }
        });

        return event;
    }
}

export default CreateEventService;
