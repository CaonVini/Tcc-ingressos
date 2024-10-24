import { Router } from 'express';

// Middlewares //

import checkUserRole from '../middlewares/PermissionMiddleware';
import verifyTokenAccess from '../middlewares/AuthMiddleware';

// Controllers

import { CreateUserController } from '../controllers/CreateUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import ListUserController  from '../controllers/ListUserController';
import LoginUserController from '../controllers/LoginUserController';
import LoggedUserController from '../controllers/Loggeduser';
import CreateEventController from '../controllers/CreateEventController';



const routes = Router();



routes.get('/', (req, res) => res.json({ msg: 'hello world' }));

routes.post('/create/user', (req, res) =>  {
    return new CreateUserController().handle(req, res)
});

routes.delete('/delete/user', verifyTokenAccess, (req, res) =>  {
    return new DeleteUserController().handle(req, res)
});

routes.get('/list/user', verifyTokenAccess, (req, res) => {
    return new ListUserController().handle(req, res); 
});

routes.get('/auth/user', (req, res) =>  {
    return new LoginUserController().handle(req, res) 
});

routes.get("/me", verifyTokenAccess, (req, res) => {
    return new LoggedUserController().handle(req, res);
});

routes.post('/create/event', verifyTokenAccess, checkUserRole, (req, res) =>  {
    return new CreateEventController().handle(req, res)
});

export default routes;
