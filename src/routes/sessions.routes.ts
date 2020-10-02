import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';



const sessionsRouter = Router();



sessionsRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const authenticateUser = new AuthenticateUserService();

        const {user, token} = await authenticateUser.execute({
            email, password
        });

        delete user.password;

        return res.json({user, token});
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }


})



export default sessionsRouter;
