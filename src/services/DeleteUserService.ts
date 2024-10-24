import prisma from "../utils/db";

interface DeleteUserProps{
    id: number,
}

class DeleteUserService{
 async execute({id}: DeleteUserProps){

    if(!id){
        throw {
            statusCode: 400,
            msgError: "Preencha o id."
        };
    }

    const findUser = await prisma.user.findFirst({where:{
        id: id,
    }})

    if(!findUser){
        throw {
            statusCode: 404,
            msgError: "Id não encontrado."
        };
    }

    await prisma.user.delete({where:{
        id: findUser.id
    }})

 }
}

export default DeleteUserService;