import { Router } from 'express';

// Middlewares //

import checkUserRole from '../middlewares/PermissionMiddleware';
import verifyTokenAccess from '../middlewares/AuthMiddleware';

// Controllers

import { CreateUserController } from '../controllers/CreateUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import ListUserController  from '../controllers/ListUserController';
import LoginUserController from '../controllers/LoginUserController';
import LoggedUserController from '../tests/Loggeduser';
import CreateEventController from '../controllers/CreateEventController';
import ParticipateEventController from '../controllers/ParticipateEventController';
import ParticipatingEventsController from '../controllers/ParticipatingEventsController';
import ListEventController from '../controllers/ListEventsController';



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

routes.post('/auth/user', (req, res) =>  {
    return new LoginUserController().handle(req, res) 
});

routes.get("/me", verifyTokenAccess, (req, res) => {
    return new LoggedUserController().handle(req, res);
});

routes.post('/create/event', verifyTokenAccess, checkUserRole, (req, res) =>  {
    return new CreateEventController().handle(req, res)
});

routes.post('/participate/event', verifyTokenAccess, (req, res) =>  {
    return new ParticipateEventController().handle(req, res)
});

routes.get('/list/event/user', verifyTokenAccess, (req, res) =>  {
    return new ParticipatingEventsController().handle(req, res)
});

routes.get('/list/event', verifyTokenAccess, (req, res) =>  {
    return new ListEventController().handle(req, res)
});


export default routes;
