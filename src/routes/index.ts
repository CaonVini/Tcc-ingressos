import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import ListUserController  from '../controllers/ListUserController';
import LoginUserController from '../controllers/LoginUserController';
import verifyTokenAccess from '../middlewares/AuthMiddleware';

const routes = Router();



routes.get('/', (req, res) => res.json({ msg: 'hello world' }));

routes.post('/create/user', (req, res) =>  {
    return new CreateUserController().handle(req, res)
});

routes.delete('/delete/user', verifyTokenAccess, (req, res) =>  {
    return new DeleteUserController().handle(req, res)
});

routes.get('/list/user', verifyTokenAccess, (req, res) => {
    return new ListUserController().handle(req, res); // Certifique-se de que ListUserController é uma classe
});

routes.get('/auth/user', (req, res) =>  {
    return new LoginUserController().handle(req, res) // Ensure ListUserController is a class
});

export default routes;
